import React from 'react';
import { Button } from './basiccomponents';
import "bootstrap/dist/css/bootstrap.min.css";

export class NavBar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menu: !this.state.menu })
    }


    renderNavItem(item)
    {
        let navItem = null;
        switch (item.type)
        {
            case "link":
                navItem = <NavItemLink
                    text = {item.text}
                />
                break;
            case "form":
                navItem = <NavItemForm
                    formItems={item.formItems}
                />
                break;
        }
        return navItem;
    }

    renderNavSection(section, sectionPosition) {
        const navItems = section.sectionItems.map(navItem => { return this.renderNavItem(navItem); })
        return (
            <ul className={section.sectionStyle} key={"section" + sectionPosition}>
                {navItems}
            </ul>
        );
    }

    render()
    {
        const show = (this.state.menu) ? "show" : "";
        const navItems = this.props.navItems.map((navItem, navItemPosition) => { return this.renderNavSection(navItem, navItemPosition); });
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">{this.props.title}</a>
                <button className="navbar-toggler" type="button" onClick={this.toggleMenu} aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse " + show}>
                        {navItems}
                </div>
            </nav>
        );
    }
}

export class NavItemLink extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <li className="nav-item">
                <a class="nav-link" href="#">{this.props.text}</a>
            </li>
        )
    }
}

export class NavItemForm extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    renderFormItem(item)
    {
        let formItem = null;
        switch (item.type)
        {
            case "button":
                formItem = <Button
                    id={item.id}
                    style={item.style}
                    text={item.text}
                    onClick={item.onClick}
                />
            break;
        }
        return formItem;
    }

    render()
    {
        const formItems = this.props.formItems.map(formItem => { return this.renderFormItem(formItem); });
        return (
            <form class="form-inline">
                { formItems }
            </form>
        );
    }
}