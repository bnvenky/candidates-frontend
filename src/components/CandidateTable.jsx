/* eslint-disable react/prop-types */
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Chip,
  Avatar
} from '@mui/material';
import { Person } from '@mui/icons-material';

export default function CandidateTable({ candidates }) {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Phone</TableCell>
            <TableCell sx={{ color: 'white' }}>Email</TableCell>
            <TableCell sx={{ color: 'white' }}>Gender</TableCell>
            <TableCell sx={{ color: 'white' }}>Experience</TableCell>
            <TableCell sx={{ color: 'white' }}>Skills</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow 
              key={candidate.id}
              sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Person />
                  </Avatar>
                  {candidate.name}
                </div>
              </TableCell>
              <TableCell>{candidate.phone}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>
                <Chip 
                  label={candidate.gender}
                  size="small"
                  color={candidate.gender === 'Male' ? 'info' : candidate.gender === 'Female' ? 'secondary' : 'default'}
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={candidate.experience}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {candidate.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: '4px' }}
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}