import React, { useState } from 'react';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField, Chip } from '@mui/material';
import Layout from '../layout/Layout';
import axios from 'axios';
import FollowButton from '../button/FollowButton';

const LogoSearch = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [error, setError] = useState(false);
    const [chips, setChips] = useState([])

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/search-user`, {
                params: { query: query }
            });
            if (response.status === 200) {
                setResult(response.data.user);
                setChips((prev) => {
                    if (!prev.includes(query)) {
                        return [...prev, query]
                    }
                    return prev;
                });

            } else {
                setError(true);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleDeleteChip=(index)=>{
        const newChips = [...chips];
        newChips.splice(index,1);
        return setChips(newChips)
    }

   

    return (
        <Layout>
            <Box sx={styles.container}>
                {/* Search Bar */}
                <Box sx={styles.searchBarContainer}>
                    <TextField
                        type="text"
                        placeholder="#Explore"
                        sx={styles.searchBar}
                        onChange={(e) => setQuery(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" onClick={handleSearch}>
                                    <SearchIcon sx={styles.searchIcon} />
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FlutterDashIcon sx={styles.icon} />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>

                {/* Search Results */}
                <Box sx={styles.resultsContainer}>
                    {result.length > 0 ? (
                        <List sx={styles.list}>
                            {result.map((user) => (
                                <ListItem key={user._id} sx={styles.listItem}>
                                    <ListItemAvatar>
                                        <Avatar src={`${process.env.REACT_APP_API}/uploads/${user.profileImage}`} sx={styles.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.name}
                                        secondary={user.email}
                                        primaryTypographyProps={{ sx: styles.userName }}
                                        secondaryTypographyProps={{ sx: styles.userEmail }}
                                    />
                                    <FollowButton followId={user._id} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        error && <p style={styles.noUser}>No User Found.</p>
                    )}
                </Box>

                {chips.length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "10px" }}>
                        {chips.map((chip, index) => (
                            <Chip key={index} label={chip} variant="outlined" onDelete={() => handleDeleteChip(index)}/>
                        ))}
                    </Box>
                )}

            </Box>
        </Layout>
    );
};

export default LogoSearch;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        borderRadius: "15px",
        boxShadow: "0px 0px 15px #FF00FF",
        width: "100%",
        minHeight: "100vh",
        color: "white",
    },

    searchBarContainer: {
        width: "95%",
        display: "flex",
        justifyContent: "center",
        margin: "10px",
    },

    searchBar: {
        width: "100%",
        maxWidth: "500px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "10px",
        color: "white",
        '& .MuiInputBase-input': {
            color: "white",
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "#FF00FF",
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: "#ff8c00",
        }
    },

    icon: {
        color: "#FF00FF",
    },

    searchIcon: {
        color: "white",
        cursor: "pointer",
    },

    resultsContainer: {
        marginTop: "20px",
        borderRadius: "10px",
        background: "rgba(255, 255, 255, 0.1)",
        padding: "10px",
    },

    list: {
        width: "100%",
        background: "transparent",
    },

    listItem: {
        background: "linear-gradient(135deg, #ff00ff, #ff8c00)",
        marginBottom: "10px",
        borderRadius: "10px",
        padding: "10px",
        transition: "0.3s",
        '&:hover': {
            boxShadow: "0px 0px 10px #FF00FF",
        },
    },

    avatar: {
        width: 40,
        height: 40,
        border: "2px solid #FF00FF",
    },

    userName: {
        color: "white",
        fontWeight: "bold",
    },

    userEmail: {
        color: "rgba(255, 255, 255, 0.8)",
    },

    noUser: {
        textAlign: "center",
        fontSize: "16px",
        color: "gray",
    },
};
