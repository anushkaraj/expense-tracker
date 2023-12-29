import React from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';

export default function CardForCategoryDetails(props) {
  const { description } = props;

  // Check if the description is longer than 20 characters
  const isLongDescription = description && description.length > 20;

  // Truncate the description if it's longer than 20 characters
  const truncatedDescription = isLongDescription ? `${description.slice(0, 17)}...` : description;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10px',
        marginBottom: '10px',
        font: 'small-caption',
        marginLeft: '20px',
        marginRight: '20px',
        fontSize: '13px',
      }}
    >
      <div style={{ marginTop: '10px' }}>
        <AdjustIcon fontSize="small" marginTop="-10px" ></AdjustIcon>
      </div>
      <div style={{ marginLeft: '-30px' }}>
        <p>{props.amount}</p>
      </div>

      {/* Conditionally render truncated description with tooltip */}
      <div
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '200px', // Set a max width for the tooltip
          cursor: 'pointer',
        }}
        title={description} // Tooltip content
      >
        <p>{truncatedDescription}</p>
      </div>

      <p>{props.date}</p>
    </div>
  );
}
