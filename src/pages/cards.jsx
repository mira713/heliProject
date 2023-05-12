import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../redux/action';
import {
    Box, Image, Button, Input, Text, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Flex, Heading, Spinner, Card, Checkbox, CheckboxGroup, CardBody,useToast
} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom"
import './style.css';
import { RiTeamFill } from 'react-icons/ri'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const Cards = () => {
    let data = useSelector((store) => store.data);
    const loading = useSelector((store) => store.loading);
    const dispatch = useDispatch();
    let [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [mod, setMod] = useState({});
    const [page, setPage] = useState(1);
    let users = JSON.parse(localStorage.getItem('user'))||[];
    const navigate = useNavigate();
    let toast = useToast();
    const [select, setSelect] = useState([])

    useEffect(() => {
        dispatch(getData(page,select));
    }, [page,select.length])

    let handleChange = (e) => {
        let text = e.target.value;
        setSearch(text)
    }


    let onOpens = (e) => {
        let newData = data.filter((el) => {
            let name = el.first_name + " " + el.last_name
            name = name.toLocaleLowerCase();
            search = search.toLowerCase();
            return name.includes(search)
        })
        setShowModal(!showModal);
        onOpen()
        setMod(newData[0])
    }

    const paginate = (num) => {
        setPage(page + num)
    }

    function makeTeam(item){
       console.log(item);
      let newData = data.map((el)=>{
       if(item.domain==el.domain){
         el.available = false
         return el
       }
       return el
       })
       
       if(users.length<5){
        users.push(item)
       }
       localStorage.setItem("user",JSON.stringify(users));
       if(users.length===5){
        navigate('/team')
       }
       toast({
        title: 'Member added',
        description: "Member added to your Team",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      data= newData
    }
let handleClick=(e,id)=>{
   const {value} = e.target;
   let activeData = document.getElementById(id).checked;
   if(activeData){
       setSelect([...select,value])
   }else{
    setSelect(select.filter((val)=>val!==value))
   }
}
console.log(select)
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
                <Box className="icn" onClick={()=>{navigate('/team')}}>
                    <RiTeamFill size="30" />
                    <Text>Team</Text>
                </Box>
            </nav>
            <Box h="10vh" w="100%" border="2px solid black">
                <Flex mt="16vh" flexDirection={'row-reverse'}>
                    <Button disabled={page >= 50 ? true : false} onClick={() => { paginate(1) }} backgroundImage="linear-gradient(to right,#31072d , #b217a3)" color="white">Next</Button>
                    <Button>{page}</Button>
                    <Button disabled={page <= 1 ? true : false} onClick={() => { paginate(-1) }} backgroundImage="linear-gradient(to right,#31072d , #b217a3)" color="white">Prev</Button>
                </Flex>
            </Box>
            <Flex>
                <Box w={["35%", "30%", "28%", "20%"]} mt="16vh">
                    <Card >
                        <CardBody>
                            <Heading size={["xs", "sm", "md"]}>Filter</Heading>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CheckboxGroup>
                                <Text fontWeight={'bold'}>Gender</Text>
                                <Checkbox id="1"onChange={(e)=>handleClick(e,1)} value="Male">Male</Checkbox><br />
                                <Checkbox id="2"onChange={(e)=>handleClick(e,2)} value="Female">Female</Checkbox>
                            </CheckboxGroup>
                        </CardBody>
                        <CardBody>
                            <CheckboxGroup>
                                <Text fontWeight={'bold'}>Domain</Text>
                                <Checkbox id="3"onChange={(e)=>handleClick(e,3)}value="Sales">Sales</Checkbox><br />
                                <Checkbox  id="4"onChange={(e)=>handleClick(e,4)}value="Finance">Finance</Checkbox><br />
                                <Checkbox id="5"onChange={(e)=>handleClick(e,5)}value="UI Designing">UI Designing</Checkbox><br />
                                <Checkbox id="6"onChange={(e)=>handleClick(e,6)}value="Marketing">Marketing</Checkbox><br />
                                <Checkbox id="7"onChange={(e)=>handleClick(e,7)}value="Business Development">Business Development</Checkbox><br />
                                <Checkbox id="8"onChange={(e)=>handleClick(e,8)}value="Management">Management</Checkbox><br />
                                <Checkbox id="9"onChange={(e)=>handleClick(e,9)}value="IT">IT</Checkbox><br />
                            </CheckboxGroup>
                        </CardBody>
                        <CardBody>
                            <CheckboxGroup>
                                <Text fontWeight={'bold'}>Availability</Text>
                                <Checkbox  id="10"onChange={(e)=>handleClick(e,10)}value="true">True</Checkbox><br />
                                <Checkbox id="11"onChange={(e)=>handleClick(e,11)}value="false">False</Checkbox>
                            </CheckboxGroup>
                        </CardBody>
                    </Card>
                </Box>

                <Box w={["64%", "68%", "70%", "78%"]} mt="16vh" ml="20px">
                    <Text size="md" backgroundImage="linear-gradient(to right,#31072d , #b217a3)" color="white" p="2" fontWeight={'bold'} w="100%">Players</Text>
                    <Box className='grid' w="100%">
                        {showModal && <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Detail of the Member</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    {mod ? <Box>
                                        <Image alt={mod.id} src={mod.avatar} />
                                        <Text fontWeight={'bold'}>Name : {mod.first_name + " " + mod.last_name}</Text>
                                        <Text>Email : {mod.email}</Text>
                                        <Text>Gender : {mod.gender}</Text>
                                        <Text>Domain : {mod.domain}</Text>
                                    </Box> : ""}
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>}
                        {loading ? <Box>
                            <Spinner
                                thickness='8px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='#31072d'
                                size='xl'
                                position={'absolute'}
                                left="50%"
                                top="50%"
                                transform={'translate(-50%,-50%)'}
                            />
                        </Box> :
                            data?.map((el) => {
                                return (
                                    <Box key={el.id} boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" p="5">
                                        <Box w="30%" margin="auto">
                                            <Image src={el.avatar} alt={el.id} />
                                        </Box>
                                        <Box>
                                            <Text fontWeight={'bold'}>Name : {el.first_name + " " + el.last_name}</Text>
                                            <Text>Email : {el.email}</Text>
                                            <Text>Gender : {el.gender}</Text>
                                            <Text>Domain : {el.domain}</Text>
                                            <Box w="20%" margin="auto">
                                                {el.available ? <Box className='addIcn' onClick={()=>makeTeam(el)}>
                                                    <AiFillCheckCircle size="20" color="green" />
                                                    <Text>Available</Text>
                                                </Box> :
                                                    <Box className='crossIcn'>
                                                        <AiFillCloseCircle size="20" color="red" />
                                                        <Text>Not Available</Text>
                                                    </Box>
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })}
                    </Box>
                </Box>
            </Flex>
        </div>
    )
}

export default Cards