pub const LINT_TRANSFORM_LOADER_EXTENSIONS: &[&str] = &["vue"];

pub struct TransformLoader;

impl TransformLoader {
    // Transform special files into oxc ast.
    // Returns `None` if the special file does not supported to transform.
    // pub fn parse<'a>(ext: &str, source_text: &'a str) -> Option<Vec<JavaScriptSource<'a>>> {
    //     match ext {
    //         _ => None,
    //     }
    // }
}
