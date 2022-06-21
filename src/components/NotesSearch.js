import React from "react";

class NotesSearch extends React.Component {
  constructor(props) {
    super(props);

    this.onKeywordChange = this.onKeywordChange.bind(this);
  }

  onKeywordChange = (event) => {
    this.props.onSearch(event.target.value);
  };

  render() {
    return (
      <div className="note-app__search">
        <input
          type="text"
          placeholder="Search"
          onChange={this.onKeywordChange}
        />
      </div>
    );
  }
}

export default NotesSearch;
