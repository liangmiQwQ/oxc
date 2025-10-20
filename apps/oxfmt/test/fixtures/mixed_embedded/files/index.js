const styles = css`
  .button {
    color: red;
  }
`;

const query = gql`
  query {
    users {
      name
    }
  }
`;

const template = html`
  <div><h1>Title</h1></div>
`;

const docs = md`
  # Documentation
  
  This is **important**.
`;
