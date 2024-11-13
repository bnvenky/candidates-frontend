import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Button,
  TextField,
  IconButton,
  Box,
  Pagination,
  
} from '@mui/material';
import { Search, FilterList, Add } from '@mui/icons-material';
import CandidateTable from './components/CandidateTable';
import AddCandidateDialog from './components/AddCandidateDialog';
import FilterDialog from './components/FilterDialog';

const ITEMS_PER_PAGE = 10;

function App() {
  const [candidates, setCandidates] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    experience: '',
    skills: []
  });
  const [filters, setFilters] = useState({
    gender: '',
    experience: '',
    skills: []
  });

  // Fetch all candidates from the API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('https://candidates-backend-p6xb.onrender.com/api/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleAddCandidate = async () => {
    try {
      const response = await axios.post('https://candidates-backend-p6xb.onrender.com/api/candidates', newCandidate);
      setCandidates([...candidates, response.data]);
      setNewCandidate({
        name: '',
        phone: '',
        email: '',
        gender: '',
        experience: '',
        skills: []
      });
      setOpenAddDialog(false);
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.phone.includes(searchQuery) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = 
      (!filters.gender || candidate.gender === filters.gender) &&
      (!filters.experience || candidate.experience === filters.experience) &&
      (filters.skills.length === 0 || filters.skills.every(skill => candidate.skills.includes(skill)));

    return matchesSearch && matchesFilters;
  });

  const paginatedCandidates = filteredCandidates.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={() => setOpenAddDialog(true)}
          startIcon={<Add />}
          sx={{ px: 3 }}
        >
          Add Candidate
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              width: 300,
              bgcolor: 'white'
            }}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
          <IconButton 
            onClick={() => setOpenFilterDialog(true)}
            sx={{ 
              bgcolor: 'white',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <FilterList />
          </IconButton>
        </Box>
      </Box>

      <CandidateTable candidates={paginatedCandidates} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <AddCandidateDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        candidate={newCandidate}
        onChange={setNewCandidate}
        onSubmit={handleAddCandidate}
      />
      
      <FilterDialog
        open={openFilterDialog}
        onClose={() => setOpenFilterDialog(false)}
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters({ gender: '', experience: '', skills: [] })}
      />
    </Container>
  );
}

export default App;
