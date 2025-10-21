#![expect(clippy::needless_pass_by_value)]

use std::process::{ExitCode, Termination};

use napi_derive::napi;

use crate::{
    cli::{CliRunResult, FormatRunner, format_command},
    prettier_plugins::{JsFormatEmbeddedCb, create_external_formatter},
};

/// NAPI entry point.
///
/// JS side passes in:
/// 1. `args`: Command line arguments (process.argv.slice(2))
/// 2. `format_embedded_cb`: Callback to format embedded code in templates
///
/// Returns `true` if formatting succeeded without errors, `false` otherwise.
#[napi]
pub fn format(args: Vec<String>, format_embedded_cb: JsFormatEmbeddedCb) -> bool {
    format_impl(&args, format_embedded_cb).report() == ExitCode::SUCCESS
}

/// Run the formatter.
fn format_impl(args: &[String], format_embedded_cb: JsFormatEmbeddedCb) -> CliRunResult {
    crate::init_tracing();
    crate::init_miette();

    // Parse command line arguments
    let command = match format_command()
        .run_inner(args.iter().map(|s| s.as_ref() as &str).collect::<Vec<_>>().as_slice())
    {
        Ok(cmd) => cmd,
        Err(e) => {
            e.print_message(100);
            return if e.exit_code() == 0 {
                CliRunResult::None
            } else {
                CliRunResult::InvalidOptionConfig
            };
        }
    };

    // Create external formatter from JS callback
    let external_formatter = create_external_formatter(format_embedded_cb);

    // Run the formatter with external formatter support
    // stdio is blocked by LineWriter, use a BufWriter to reduce syscalls.
    let mut stdout = std::io::BufWriter::new(std::io::stdout());
    FormatRunner::new(command).with_external_formatter(Some(external_formatter)).run(&mut stdout)
}
