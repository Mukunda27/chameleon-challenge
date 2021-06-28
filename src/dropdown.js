/* 

Prompt:
  We have defined a basic dropdown via the Dropdown and DropdownItem components below, with example usage
  in the ExampleNav component. The Dropdown and DropdownItem components have some problems, and also 
  have room for improvements (doesn't everything?) A couple items TODO here (make sure to explain with comments!)
  
  0. How are you today? Still going strong 💪🏽 after a long day at work
  1. Please fix any obvious issues you see with the dropdown.
  2. Please then make improvements to the dropdown.
  3. Consider the different ways that this dropdown might be used and what changes would
     be neccessary to make it more flexible.
  4. If we wanted to sync this dropdown selection to the server with
     app.sync('PATCH', 'user', { dropdown_1_state: {true,false} }) where would this be included?
  Ans: Add a componentDidUpdate lifecycle hook that would perform an API call. Everytime the togle event handler is 
       fired, we call setState which would trigger componentDidUpdate
  5. If we wanted to pass children (like this example) OR a Promise that resolves to an array of items
     what changes should be made? (just a sentence or two or some code is ok).
  Ans: Use Array.map to display a list of items. It is laready implemented below.
  PS: No need to worry about CSS.

 */

import React, { Component, PureComponent } from "react";

//Making the dropdown more flixible
const dropdownMenu = [
  {
    label: "More Items",
    items: [
      { href: "/pagg2", name: "Page 2" },
      { href: "/page3", name: "Page 3" },
      { href: "/page4", name: "Page 4" },
    ],
  },
  {
    label: "Even More Items",
    items: [
      { href: "/page5", name: "Page 5" },
      { href: "/page6", name: "Page 6" },
    ],
  },
];

/* Does not need to a pure component. 
   Pure COmponents have a default implementation of shouldComponentUpdate lifecycle hook that checks
   for chabges in state and props before continuing with thte re-rendering phase.
   Making this a pure component would prevent this from having any firther updates as label prop will never change. */
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    // Methods are not bound by by default in JS. Event handlers accessing the this keyword will
    // need explicit setting of the context.
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { isOpen } = this.state;

    // Reverse the current dropdon state.
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { label } = this.props.menu;
    const { items } = this.props.menu;

    return (
      <div className="dropdown" style={{ width: "250px", margin: "25px" }}>
        <button
          type="button"
          className="dropdown-button"
          id="dropdownButton"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={this.toggle}
        >
          {label}
        </button>

        {/* Conditionally rendering the dropdown items based on the state */}
        {this.state.isOpen && (
          <ul
            style={{ width: "100%", padding: "0" }}
            className={`${isOpen ? "dropdown-open" : ""} dropdown-menu`}
            aria-labelledby="dropdownButton"
            role="menu"
          >
            {items.map((item, index) => {
              return (
                <DropdownItem key={index} href={item.href} name={item.name} />
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

class DropdownItem extends PureComponent {
  render() {
    //creating an anchor using the passed doen props
    return (
      <l1>
        <a href={this.props.href} style={{ display: "block", width: "100%" }}>
          {this.props.name}
        </a>
      </l1>
    );
  }
}

class ExampleNav extends PureComponent {
  render() {
    return (
      <nav>
        <a href="/page1">Page 1</a>
        {dropdownMenu.map((dd, index) => {
          return <Dropdown key={index} menu={dd} />;
        })}
      </nav>
    );
  }
}

export default ExampleNav;
