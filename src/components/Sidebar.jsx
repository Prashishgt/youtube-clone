import { Category } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React from "react";
import { categories } from "../utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
 return (
  <Stack 
    direction='row'
    sx = {{
      overflow:'auto',
      height: {
        sx:'auto', md:'95%'},
        flexDirection: {md: 'column'},
    }}
  >
    {categories.map((value)=>{
      return (
        <button className="category-btn" onClick={() => {
          setSelectedCategory(value.name)
        }}
        style={{
          background:value.name === selectedCategory && '#FC1503',
          color:'white'
        }}
        key={value.name}
        >
          <span style={{ color: value.name === selectedCategory ? 'white':'red', marginRight:'15px'}}>{value.icon}</span>
          <span style={{ opacity: value.name === selectedCategory ? '1' : '0.8' }}>{value.name}</span>
        </button>
      );
    })}

  </Stack>
 );
 
};

export default Sidebar;
