import React from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';

function createData(title: string) {
  return {
    title,
  };
}

const handleDownload = (titles: string[]) => {
  const csvRows = titles.map(title => [title, '']);

  const csvContent = "data:text/csv;charset=utf-8,"
    + csvRows.map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "article_titles.csv");
  document.body.appendChild(link);
  link.click();
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="right">
          <Button onClick={() => handleDownload([row.title])} variant="contained">Télécharger</Button>
        </TableCell>
      </TableRow>
      <TableRow>
      </TableRow>
    </React.Fragment>
  );
}

interface CollapsibleTableProps {
  currentPageItems: any[];
}

export const CollapsibleTable: React.FC<CollapsibleTableProps> = ({
  currentPageItems,
}) => {
  const rowsData = currentPageItems.map((item) => createData(item.title));

  return (
    <div className="py-8">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Titre</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
