/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Stack
} from '@mui/material';

export default function AddCandidateDialog({ open, onClose, candidate, onChange, onSubmit }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 8,
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        fontSize: '1.5rem'
      }}>
        Add New Candidate
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            value={candidate.name}
            onChange={(e) => onChange({ ...candidate, name: e.target.value })}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Phone"
            value={candidate.phone}
            onChange={(e) => onChange({ ...candidate, phone: e.target.value })}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Email"
            type="email"
            value={candidate.email}
            onChange={(e) => onChange({ ...candidate, email: e.target.value })}
            fullWidth
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={candidate.gender}
              label="Gender"
              onChange={(e) => onChange({ ...candidate, gender: e.target.value })}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Experience</InputLabel>
            <Select
              value={candidate.experience}
              label="Experience"
              onChange={(e) => onChange({ ...candidate, experience: e.target.value })}
            >
              <MenuItem value="1 Year">1 Year</MenuItem>
              <MenuItem value="2 Years">2 Years</MenuItem>
              <MenuItem value="3 Years">3 Years</MenuItem>
              <MenuItem value="4+ Years">4+ Years</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Skills</InputLabel>
            <Select
              multiple
              value={candidate.skills}
              label="Skills"
              onChange={(e) => onChange({ ...candidate, skills: e.target.value })}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip 
                      key={value} 
                      label={value}
                      size="small"
                      color="primary"
                    />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="Node.js">Node.js</MenuItem>
              <MenuItem value="MongoDB">MongoDB</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          color="inherit"
        >
          Cancel
        </Button>
        <Button 
          onClick={onSubmit}
          variant="contained"
          sx={{ px: 4 }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}