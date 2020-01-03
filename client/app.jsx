// var s = require('../server');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: " ",
      blog: " ",
      data: []
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    $.get("/getData", data => {
      this.setState({ data: data });
      // console.log(this.state.data);
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(e.target.value);
  }

  submit(e) {
    // e.preventDefault();
    const blogForm = {
      name: this.state.name,
      blog: this.state.blog
    };
    $.ajax({
      url: "/postData",
      method: "POST",
      data: blogForm,
      success: () => {
        console.log("data has been sent to the server.");
      },
      error: err => {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div id="mainDiv">
        <form onSubmit={this.submit}>
          <label id="name">
            Name: <br />
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={e => this.handleChange(e)}
            />
          </label>
          <br />
          <br />
          <label id="blog">
            Blog Topic: <br />
            <textarea
              name="blog"
              type="text"
              value={this.state.blog}
              onChange={e => this.handleChange(e)}
              style={{ width: "400px", height: "80px" }}
            />
          </label>

          <br />
          <br />
          <button> post </button>
        </form>
        {/* ////////////////////////////////////////////////////////////// VIEW GET
        FROM SERVER ////////////////////////////////////////////////////////////// */}
        <div>
          <div>
            {this.state.data.map((element, i) => (
              <div key={i}>
                <div id="name">{element.name}</div>
                <div id="blog">{element.blog}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("reactDiv"));
