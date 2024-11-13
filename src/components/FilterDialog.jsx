/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Stack
} from '@mui/material';

export default function FilterDialog({ 
  open, 
  onClose, 
  filters, 
  onChange,
  onClear 
}) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
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
        Filter Candidates
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={filters.gender}
              label="Gender"
              onChange={(e) => onChange({ ...filters, gender: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Experience</InputLabel>
            <Select
              value={filters.experience}
              label="Experience"
              onChange={(e) => onChange({ ...filters, experience: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
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
              value={filters.skills}
              label="Skills"
              onChange={(e) => onChange({ ...filters, skills: e.target.value })}
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
          onClick={onClear}
          color="inherit"
        >
          Clear All
        </Button>
        <Button 
          onClick={onClose}
          variant="outlined"
          color="inherit"
        >
          Cancel
        </Button>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{ px: 4 }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}