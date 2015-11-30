import React from 'react';
import cx from 'classnames';
import './LinkList.css';

function findDuplicates (links) {
  const uniq = {};
  return links.reduce((memo, link) => {
    if (!uniq[link.href]) {
      memo.push(false);
      uniq[link.href] = true;
    } else {
      memo.push(true)
    }
    return memo;
  }, []);
}

function groupByDomain(links) {
  let mapped = links.map((link, i) => {
    return {
      index: i,
      reverseHostname: link.hostname.split('.').reverse().join('.')
    };
  });
  mapped.sort((a, b) => {
    if (a.reverseHostname < b.reverseHostname) {
      return -1;
    }
    if (a.reverseHostname > b.reverseHostname) {
      return 1;
    }
    if (a.index < b.index) {
      return -1;
    }
    if (a.index > b.index) {
      return 1;
    }
    return 0;
  });
  return mapped.map(v => links[v.index]);
}

const LinkList = React.createClass({
  getInitialState: function () {
    return {
      dedup: this.props.dedup,
      groupByDomain: false
    };
  },
  toggleDedup: function () {
    this.setState({
      dedup: !this.state.dedup
    });
  },
  toggleGroupByDomain: function () {
    this.setState({
      groupByDomain: !this.state.groupByDomain
    });
  },
  render: function () {
    if (this.props.expired) {
      return (
        <div className="container-fluid">
          <h1 className="LinkPageHeader">Expired</h1>
          <p>
            Link information has expired and is no longer available.
            Please close this tab and try again.
          </p>
        </div>
      );
    }
    const links = this.state.groupByDomain ? groupByDomain(links) : this.props.links;
    let noLinksFound = null;
    if (links.length === 0) {
      noLinksFound = (
        <p>
          No links were found.
        </p>
      );
    }
    const duplicates = findDuplicates(links);
    const items = links.reduce((memo, link, index) => {
      if (this.state.dedup && duplicates[index]) {
        return memo;
      }
      const itemClassName = cx('LinkListItem', {
        'LinkListItem--duplicate': duplicates[index]
      });
      memo.push(
        <li className={itemClassName} key={index}>
          <a href={link.href}>{link.href}</a>
        </li>
      );
      return memo;
    }, []);
    let status = null;
    if (items.length === 0) {
      // do nothing
    } else if (items.length === 1) {
      status = (
        <div className="LinkPageStatus">
          1 link out of {links.length} shown
        </div>
      )
    } else {
      status = (
        <div className="LinkPageStatus">
          {items.length} links out of {links.length} shown
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <h1 className="LinkPageHeader">{this.props.source}</h1>

        {status}

        <div className="LinkPageOptions checkbox">
          <label>
            <input type="checkbox" checked={this.state.dedup} onChange={this.toggleDedup} /> Hide duplicate links
          </label>
          <label>
            <input type="checkbox" checked={this.state.groupByDomain} onChange={this.toggleGroupByDomain} /> Group by domain
          </label>
        </div>

        {noLinksFound}

        <ul className="LinkList">
          {items}
        </ul>
      </div>
    );
  }
});

export default LinkList;
