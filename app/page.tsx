'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import {firestore} from '@/firebase'
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";


export default function Home() {

  interface Inventory {
    name: string;
    quantity: number;
  }

  const [inventory, setInventory] = useState<Inventory[]>([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  
  // snapshot is snapshot of collection 
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory")) // getting the collection in firebase
    const docs = await getDocs(snapshot) // getting document from collection data 
    const inventoryList:any = [] // come back and fix this typescript 
    console.log(docs) // solve this with typescript 
    docs.forEach((doc)=>{
      inventoryList.push({
        name:doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  const removeItem = async (item:any) => { // see wassup with the typescript 
    const docRef = doc(collection(firestore, "inventory"), item) //gets docref if it exist
    const docSnap = await getDoc(docRef)
    console.log(item) //typescript fix with this 
    if (docSnap.exists()){
      const {quantity} = docSnap.data() // getting the count or quantity from data 
      if (quantity === 1){
        await deleteDoc(docRef)
      }else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  const addItem = async (item:any) => { // see wassup with the typescript 
    const docRef = doc(collection(firestore, "inventory"), item) //gets docref if it exist
    const docSnap = await getDoc(docRef)
    console.log(item) //typescript fix with this 
    if (docSnap.exists()){
      const {quantity} = docSnap.data() // getting the count or quantity from data 
      await setDoc(docRef, {quantity: quantity + 1})
    }else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }

  useEffect(()=>{
    updateInventory()
  }, [])

  const handleOpen = ()=> setOpen(true)
  const handleClose = () => setOpen(false)
  
  return (
  <>
  <Box 
  width="100vw" 
  height="100vh" 
  display="flex" 
  justifyContent="center" 
  alignItems="center"
  gap={2}
  flexDirection="column"
  >
    <Modal open={open} onClose={handleClose}>
      <Box 
      position="absolute"
      top="50%"
      left="50%"
      width={400}
      bgcolor="white"
      border="2px solid #000"
      boxShadow={24}
      p={4}
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{transform: "translate(-50%,-50%)",}}
      >
        <Typography variant="h6"> Add Item</Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField 
          variant="outlined"
          fullWidth
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value)
          }}
          />
          <Button variant="outlined" onClick={()=>{
            addItem(itemName)
            setItemName('')
            handleClose()
          }}>ADD</Button>
        </Stack>
      </Box>
    </Modal>
    <Button variant="contained" onClick={()=>{
      handleOpen()
    }}>Add New Item</Button>
    <Box border="1px solid #333">
      <Box width="800px" height="100px" bgcolor="#ADD8E6" display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h2" color="#333">Inventory Items</Typography>
      </Box>
    <Stack width="800px" height="300px" spacing={2} overflow="auto">
      {
        inventory.map((item)=>{
         return (
         <Box key={item.name}
         width="100%"
         minHeight="150px"
         display="flex"
         alignItems="center"
         justifyContent="space-between"
         bgcolor="#f0f0f0"
         padding={5}
         >
          <Typography variant="h3" color="#333" textAlign="center">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Typography>
          <Typography variant="h3" color="#333" textAlign="center">{item.quantity}</Typography>
          <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={()=>{
            addItem(item.name)
          }}>add</Button>
          <Button variant="contained" onClick={()=>{
            removeItem(item.name)
          }}>remove</Button>
          </Stack>
         </Box>)
        })
      }
    </Stack>
    </Box>
  </Box>
  </>
  );
}
