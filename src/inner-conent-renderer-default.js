import React, { PropTypes } from 'react';
import { getIEVersion } from './utils/browser-utils';
import baseStyles from './node-renderer-default.scss';

let styles = baseStyles;
// Add extra classes in browsers that don't support flex
if (getIEVersion < 10) {
  styles = {
    ...baseStyles,
    row: `${styles.row} ${styles.row_NoFlex}`,
    rowContents: `${styles.rowContents} ${styles.rowContents_NoFlex}`,
    rowLabel: `${styles.rowLabel} ${styles.rowLabel_NoFlex}`,
    rowToolbar: `${styles.rowToolbar} ${styles.rowToolbar_NoFlex}`,
  };
}

const InnerContentRenderer = ({node, title, subtitle, path, treeIndex, buttons, canDrag}) => {
  const nodeTitle = title || node.title;
  const nodeSubtitle = subtitle || node.subtitle;
  console.log('here I am!')
  return (<div
    className={
      styles.rowContents +
      (!canDrag ? ` ${styles.rowContentsDragDisabled}` : '')
    }
  >
    <div className={styles.rowLabel}>
      <span
        className={
          styles.rowTitle +
          (node.subtitle ? ` ${styles.rowTitleWithSubtitle}` : '')
        }
      >
        {typeof nodeTitle === 'function'
          ? nodeTitle({
              node,
              path,
              treeIndex,
            })
          : nodeTitle}
      </span>

      {nodeSubtitle && (
        <span className={styles.rowSubtitle}>
          {typeof nodeSubtitle === 'function'
            ? nodeSubtitle({
                node,
                path,
                treeIndex,
              })
            : nodeSubtitle}
        </span>
      )}
    </div>

    <div className={styles.rowToolbar}>
      {buttons.map((btn, index) => (
        <div
          key={index} // eslint-disable-line react/no-array-index-key
          className={styles.toolbarButton}
        >
          {btn}
        </div>
      ))}
    </div>
  </div>
)};

InnerContentRenderer.defaultProps = {
  canDrag: false,
  buttons: [],
  title: null,
  subtitle: null,
};

InnerContentRenderer.propTypes = {
  node: PropTypes.shape({}).isRequired,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  treeIndex: PropTypes.number.isRequired,
  canDrag: PropTypes.bool,
  buttons: PropTypes.arrayOf(PropTypes.node),
};

export default InnerContentRenderer;
