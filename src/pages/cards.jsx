import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, searchData,updateData } from "../redux/action";
import {
  Box,
  Image,
  Button,
  Input,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Heading,
  Spinner,
  Card,
  Checkbox,
  CheckboxGroup,
  CardBody,
  useToast,
  transition,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { RiTeamFill } from "react-icons/ri";

const Cards = () => {
  let data = useSelector((store) => store.data);
  const loading = useSelector((store) => store.loading);
  const dispatch = useDispatch();
  let [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mod, setMod] = useState({});
  let [page, setPage] = useState(1);
  let users = JSON.parse(localStorage.getItem("user")) || [];
  const navigate = useNavigate();
  let toast = useToast();
  let [avail, setAvail] = useState('')
  let [filter, setFilter] = useState({
    gender: {
      Male: false,
      Female: false,
    },
    domain: {
      IT: false,
      Sales: false,
      Finance: false,
      Management: false,
      Marketing: false,
      UIDesigning: false,
      BusinessDevelopment: false,
    },
  });

  const findTrueVal = (filter) => {
    let finalVal = {};
    for (let key in filter) {
      for (let subkey in filter[key]) {
        if (filter[key][subkey]) {
          finalVal[key] = subkey;
        }
      }
    }
    return finalVal;
  };

  let finalFilter = findTrueVal(filter);

  let searchParam = new URLSearchParams(finalFilter);
  let queryString = searchParam.toString();

  useEffect(() => {
    dispatch(getData(page, queryString, avail));
    console.log(avail)
  }, [page, queryString, avail]);

  let handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value == "") {
      dispatch(getData(page, queryString));
    } else {
      dispatch(searchData(e.target.value, page));
    }
  };

  let onOpens = (e) => {
    let newData = data.filter((el) => {
      let name = el.first_name + " " + el.last_name;
      name = name.toLocaleLowerCase();
      search = search.toLowerCase();
      return name.includes(search);
    });
    setShowModal(!showModal);
    onOpen();
    setMod(newData[0]);
  };

  const paginate = (num) => {
    page = page + num;
    setPage(page);
  };

  function makeTeam(item) {
    let newData = data.map((el) => {
      if (item.id == el.id) {
        el.available = false;
        return el;
      }
      return el;
    });
    dispatch(updateData(newData))
    if (users.length < 5) {
      users.push(item);
    }
    localStorage.setItem("user", JSON.stringify(users));
    if (users.length === 5) {
      navigate("/team");
    }
    toast({
      title: "Member added",
      description: "Member added to your Team",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  let handleClick = (e) => {
    const { name, value, checked } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: {
        ...prevFilter[name],
        [value]: checked,
      },
    }));
  };
  return (
    <div>
      <nav className={"nav"}>
        <Box h="100%" w="15%" className="logo">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSusP1DQODcM8jnKDD48loHZ2svnR0erQZz7g&usqp=CAU"
            alt="logo"
            h="100%"
            w="100%"
          />
        </Box>
        <Box className="inpt">
          <Input
            placholder="Search By Name"
            value={search}
            onChange={(e) => handleChange(e)}
          />
          <Button color="black" onClick={() => onOpens()}>
            Search
          </Button>
        </Box>
        <Box
          className="icn"
          onClick={() => {
            navigate("/team");
          }}
        >
          <Text bgColor={'red'} w="20px" borderRadius={'5px'}>{users.length}</Text>
          <RiTeamFill size="30" />
          <Text>Team</Text>
        </Box>
      </nav>
      <Box h="10vh" w="100%" border="2px solid black">
        <Flex mt="16vh" flexDirection={"row-reverse"} mr="3%">
          <button
            disabled={page >= 50 ? true : false}
            onClick={() => {
              paginate(1);
            }}
            style={{
              backgroundImage: "linear-gradient(to right,#31072d,#b217a3)",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Next
          </button>
          <Button>{page}</Button>
          <button
            disabled={page <= 1 ? true : false}
            onClick={() => {
              paginate(-1);
            }}
            style={{
              backgroundImage: "linear-gradient(to right,#31072d,#b217a3)",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Prev
          </button>
        </Flex>
      </Box>
      <Flex>
        <Box w={["35%", "30%", "28%", "20%"]} mt="16vh">
          <Card>
            <CardBody>
              <Heading size={["xs", "sm", "md"]}>Filter</Heading>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CheckboxGroup>
                <Text fontWeight={"bold"}>Gender</Text>
                <Checkbox
                  id="1"
                  name="gender"
                  onChange={handleClick}
                  value="Male"
                  checked={filter.gender.Male}
                >
                  Male
                </Checkbox>
                <br />
                <Checkbox
                  id="2"
                  onChange={handleClick}
                  value="Female"
                  name="gender"
                  checked={filter.gender.Female}
                >
                  Female
                </Checkbox>
              </CheckboxGroup>
            </CardBody>
            <CardBody>
              <CheckboxGroup id="domain">
                <Text fontWeight={"bold"}>Domain</Text>
                <Checkbox
                  id="3"
                  onChange={handleClick}
                  value="Sales"
                  name="domain"
                  checked={filter.domain.Sales}
                >
                  Sales
                </Checkbox>
                <br />
                <Checkbox
                  id="4"
                  onChange={handleClick}
                  value="Finance"
                  name="domain"
                  checked={filter.domain.Finance}
                >
                  Finance
                </Checkbox>
                <br />
                <Checkbox
                  id="5"
                  onChange={handleClick}
                  value="UI Designing"
                  name="domain"
                  checked={filter.domain.UIDesigning}
                >
                  UI Designing
                </Checkbox>
                <br />
                <Checkbox
                  id="6"
                  onChange={handleClick}
                  value="Marketing"
                  name="domain"
                  checked={filter.domain.Marketing}
                >
                  Marketing
                </Checkbox>
                <br />
                <Checkbox
                  id="7"
                  onChange={handleClick}
                  value="Business Development"
                  name="domain"
                  checked={filter.domain.BusinessDevelopment}
                >
                  Business Development
                </Checkbox>
                <br />
                <Checkbox
                  id="8"
                  onChange={handleClick}
                  value="Management"
                  name="domain"
                  checked={filter.domain.Management}
                >
                  Management
                </Checkbox>
                <br />
                <Checkbox
                  id="9"
                  onChange={handleClick}
                  value="IT"
                  name="domain"
                  checked={filter.domain.IT}
                >
                  IT
                </Checkbox>
                <br />
              </CheckboxGroup>
            </CardBody>
            <CardBody>
              <select onChange={(e)=>setAvail(e.target.value)}>
                <option value="">availability</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </CardBody>
          </Card>
        </Box>

        <Box w={["64%", "68%", "70%", "78%"]} mt="16vh" ml="20px">
          <Text
            size="md"
            backgroundImage="linear-gradient(to right,#31072d , #b217a3)"
            color="white"
            p="2"
            fontWeight={"bold"}
            w="100%"
          >
            Players
          </Text>
          <Box className="grid" w="100%">
            {showModal && (
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Detail of the Member</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {mod ? (
                      <Box>
                        <Image alt={mod.id} src={mod.avatar} />
                        <Text fontWeight={"bold"}>
                          Name : {mod.first_name + " " + mod.last_name}
                        </Text>
                        <Text>Email : {mod.email}</Text>
                        <Text>Gender : {mod.gender}</Text>
                        <Text>Domain : {mod.domain}</Text>
                      </Box>
                    ) : (
                      ""
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            )}
            {loading ? (
              <Box>
                <Spinner
                  thickness="8px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="#31072d"
                  size="xl"
                  position={"absolute"}
                  left="50%"
                  top="50%"
                  transform={"translate(-50%,-50%)"}
                />
              </Box>
            ) : (
              data?.map((el) => {
                return (
                  <Box
                    key={el.id}
                    boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
                    p="5"
                  >
                    <Text fontSize={'12px'} fontWeight={'bold'} color="green">{el.available?'click on the button to add to your team':""}</Text>
                    <Box w="30%" margin="auto">
                      <Image src={el.avatar} alt={el.id} />
                    </Box>
                    <Box>
                      <Text fontWeight={"bold"}>
                        Name : {el.first_name + " " + el.last_name}
                      </Text>
                      <Text>Email : {el.email}</Text>
                      <Text>Gender : {el.gender}</Text>
                      <Text>Domain : {el.domain}</Text>
                      <Box w="20%" margin="auto">
                        {el.available ? (
                          <Box className="addIcn" onClick={() => makeTeam(el)}>
                            <Button
                              backgroundImage={
                                "linear-gradient(to right, #31072d , #b217a3)"
                              }
                              color="white"
                            >
                              <Text fontSize={"10px"} fontWeight={"bold"}>
                                Available
                              </Text>
                            </Button>
                          </Box>
                        ) : (
                          <Box className="crossIcn">
                            <Button
                              cursor="no-drop"
                              backgroundImage={
                                "linear-gradient(to right, #31072d , #b217a3)"
                              }
                              color="white"
                            >
                              <Text fontSize={"10px"} fontWeight={"bold"}>
                                Not Available
                              </Text>
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default Cards;
