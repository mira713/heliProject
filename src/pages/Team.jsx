import React,{useState,useEffect} from 'react';
import "./style.css";
import {
    Box, Image, Button, Input, Text,Grid,Heading
} from '@chakra-ui/react';
import { RiTeamFill } from 'react-icons/ri'

const Team = () => {
    let users = JSON.parse(localStorage.getItem('user'))||[]
    let [search, setSearch] = useState('');
    let [data, setData] = useState(users)

    let handleChange = (e) => {
        let text = e.target.value;
        setSearch(text)
    }

    let onOpens = (e) => {
        
    }

    let removeData=(element)=>{
      let filtered =  users.filter(el => el.id!==element.id);
      localStorage.setItem('user',JSON.stringify(filtered));
      setData(filtered)
    }

  return (
    <div>
               <nav className={"nav"}>
                <Box h="100%" w="15%" className='logo'>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSusP1DQODcM8jnKDD48loHZ2svnR0erQZz7g&usqp=CAU" alt="logo" h="100%" w="100%" />
                </Box>
                <Box className='inpt'>
                    <Input placholder="Search By Name" value={search} onChange={handleChange} />
                    <Button color='black' onClick={() => onOpens()} >Search</Button>
                </Box>
                <Box className="icn">
                <Text bgColor={'red'} w="20px" borderRadius={'5px'}>{users.length}</Text>
                    <RiTeamFill size="30" />
                    <Text>Team</Text>
                </Box>
            </nav>
            <Box position="absolute" >
                <Grid mt="16vh" gap="20px" gridTemplateColumns={'repeat(2,1fr)'} ml={['10%','30%','50%','70%',"100%" ]}>
                    {
                        data.map((el)=>{
                            return (
                                <Box key={el.id} w="100%" margin="auto"p="4" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
                                    <Box w="100%" margin="auto">
                                    <Image alt={el.id} src={el.avatar}/>
                                    </Box>
                                    <Box>
                                        <Text>Name : {el.first_name+" "+el.last_name}</Text>
                                        <Text>Gender : {el.gender}</Text>
                                        <Text>Domain : {el.domain}</Text>
                                        <Text>Available : Yes</Text>
                                        <Button backgroundImage="linear-gradient(to right,#31072d , #b217a3)"color="white" onClick={()=>removeData(el)}>Remove Member</Button>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Grid>
            </Box>
    </div>
  )
}

export default Team