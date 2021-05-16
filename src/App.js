import React from 'react';
import { useRef, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Table, InputGroup, FormControl, ButtonGroup, Modal } from 'react-bootstrap';
import { Calculator, Cash, House } from 'react-bootstrap-icons';

function App() {

  const formatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0
  })

  const [data, setData] = useState({
    project : "",
    housePrice : 0,
    existingPant : 0,
    driftCost : 0,
    salaryBeforeTax : 0,
    morgage : 0,
    ownCash : 0,
    bid : 0,
    pantCost : 0,
    lagfartCost : 0,
    totalCost : 0,
    minOwnCash : 0
  });

  const [saveModal, setSaveModal] = useState(false);
  const [loadModal, setLoadModal] = useState(false);

  const housePriceRef = useRef();
  const houseSlidePriceRef = useRef();
  const existingPantRef = useRef();
  const existingSlidePantRef = useRef();
  const driftCostRef = useRef();
  const driftSlideCostRef = useRef();
  const salaryBeforeTaxRef = useRef();
  const salarySlideBeforeTaxRef = useRef();
  const ownCashRef = useRef();
  const ownSlideCashRef = useRef();
  const bidRef = useRef();
  const bidSlideRef = useRef();
  const projectRef = useRef();
  const loadFieldRef = useRef();

  function handleSlide(){

    const tempData = {...data}

    // Fetch data from all slides
    tempData.bid = parseInt(bidSlideRef.current.value);
    tempData.driftCost = parseInt(driftSlideCostRef.current.value);
    tempData.existingPant = parseInt(existingSlidePantRef.current.value);
    tempData.housePrice = parseInt(houseSlidePriceRef.current.value);
    tempData.ownCash = parseInt(ownSlideCashRef.current.value);
    tempData.salaryBeforeTax = parseInt(salarySlideBeforeTaxRef.current.value);

    // Set all input field refs
    bidRef.current.value = formatter.format(tempData.bid);
    driftCostRef.current.value = formatter.format(tempData.driftCost);
    existingPantRef.current.value = formatter.format(tempData.existingPant);
    housePriceRef.current.value = formatter.format(tempData.housePrice);
    ownCashRef.current.value = formatter.format(tempData.ownCash);
    salaryBeforeTaxRef.current.value = formatter.format(tempData.salaryBeforeTax);


    // Morgage
    tempData.morgage = tempData.bid - tempData.ownCash

    // Pantbrev
    tempData.pantCost = (tempData.bid - tempData.ownCash - tempData.existingPant)*0.02
    if(tempData.pantCost < 0){ tempData.pantCost = 0}

    // Lagfart
    tempData.lagfartCost = tempData.bid*0.015

    // minOwnCash
    tempData.minOwnCash = tempData.bid*0.15

    // Total cost
    tempData.totalCost = tempData.ownCash + tempData.lagfartCost + tempData.pantCost;
    
    // Update state
    setData(tempData);

  }

  function handleInput(){

    const tempData = {...data}

    tempData.bid = parseInt(String(bidRef.current.value).replaceAll(' ', '').replace('kr',''));
    tempData.driftCost = parseInt(String(driftCostRef.current.value).replaceAll(' ', '').replace('kr',''));
    tempData.existingPant = parseInt(String(existingPantRef.current.value).replaceAll(' ', '').replace('kr',''));
    tempData.housePrice = parseInt(String(housePriceRef.current.value).replaceAll(' ', '').replace('kr',''));
    tempData.ownCash = parseInt(String(ownCashRef.current.value).replaceAll(' ', '').replace('kr',''));
    tempData.salaryBeforeTax = parseInt(String(salaryBeforeTaxRef.current.value).replaceAll(' ', '').replace('kr',''));
    tempData.project = projectRef.current.value;

    // Set all input field refs
    bidRef.current.value = formatter.format(tempData.bid);
    driftCostRef.current.value = formatter.format(tempData.driftCost);
    existingPantRef.current.value = formatter.format(tempData.existingPant);
    housePriceRef.current.value = formatter.format(tempData.housePrice);
    ownCashRef.current.value = formatter.format(tempData.ownCash);
    salaryBeforeTaxRef.current.value = formatter.format(tempData.salaryBeforeTax);

    bidSlideRef.current.value = tempData.bid;
    driftSlideCostRef.current.value = tempData.driftCost;
    existingSlidePantRef.current.value = tempData.existingPant;
    houseSlidePriceRef.current.value = tempData.housePrice;
    ownSlideCashRef.current.value = tempData.ownCash;
    salarySlideBeforeTaxRef.current.value = tempData.salaryBeforeTax;

    setData(tempData);

  }

  useEffect(()=>{

    bidRef.current.value = formatter.format(data.bid);
    driftCostRef.current.value = formatter.format(data.driftCost);
    existingPantRef.current.value = formatter.format(data.existingPant);
    housePriceRef.current.value = formatter.format(data.housePrice);
    ownCashRef.current.value = formatter.format(data.ownCash);
    salaryBeforeTaxRef.current.value = formatter.format(data.salaryBeforeTax);
    projectRef.current.value = data.project;

    bidSlideRef.current.value = data.bid;
    driftSlideCostRef.current.value = data.driftCost;
    existingSlidePantRef.current.value = data.existingPant;
    houseSlidePriceRef.current.value = data.housePrice;
    ownSlideCashRef.current.value = data.ownCash;
    salarySlideBeforeTaxRef.current.value = data.salaryBeforeTax;    

  }, [data])

  function handleCloseSave(){
    setSaveModal(false);
  }

  function handleCloseLoad(){
    setLoadModal(false);
  }

  function handleImport(){

    setData(JSON.parse(loadFieldRef.current.value))

    setLoadModal(false);
  }



  return (
      <Container fluid="lg" className="px-4" style={{ marginTop: "50px" }}>
      <Row style={{marginBottom: "10px"}}>
        <Col lg={12} className="text-center">
          <h1><Calculator color="royalblue" size={35} style={{ marginRight: "2px", marginBottom: "6px"}} /> HusBud simulatorn</h1>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex p-2">
          <ButtonGroup style={{ marginLeft : "auto" }} size="sm">
                  <Button variant="success" size="sm" onClick={()=>{setSaveModal(true)}}>Export</Button>
                  <Button size="sm" onClick={()=>{setLoadModal(true)}}>Import</Button>
          </ButtonGroup>    
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="p-2">
          <Card className="shadow-sm" style={{ width: '100%'}} >
            <Card.Body>
              <InputGroup size="lg">
                <FormControl ref={projectRef} className="text-center" style={{border:"0"}} placeholder="Projekt..." aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={handleInput} />
              </InputGroup>   
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{marginBottom: "10px"}}>
        <Col lg="12" className="p-2">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-center"><h2><House color="royalblue" size={35} style={{ marginRight: "5px", marginBottom: "13px"}} />Huset</h2></Card.Title>
                <Card.Text>
                  Använd slider för att sätta värden.
                </Card.Text>
                <Form>
                  <Form.Group controlId="housePrice">
                    <Form.Label>Utropspris</Form.Label>
                    <Form.Control ref={housePriceRef}  type="text" placeholder="0" onInput={handleInput} />
                    <Form.Control ref={houseSlidePriceRef} type="range" min="1000000" max="15000000" step="10000" onChange={handleSlide} />                
                  </Form.Group>
                  <Form.Group controlId="existingPant">
                    <Form.Label>Befintliga pantbrev</Form.Label>
                    <Form.Control ref={existingPantRef} type="text" placeholder="0" onInput={handleInput} />
                    <Form.Control ref={existingSlidePantRef} type="range" min="0" max={data.housePrice} step="1000" onChange={handleSlide} />                
                  </Form.Group>
                  <Form.Group controlId="driftCost">
                    <Form.Label>Driftkostnad (kr/år)</Form.Label>
                    <Form.Control ref={driftCostRef} type="text" placeholder="0" onInput={handleInput} />
                    <Form.Control ref={driftSlideCostRef} type="range" min="0" max="50000" step="500" onChange={handleSlide}/>                
                  </Form.Group>                                                
                </Form>       
              </Card.Body>
            </Card>
        </Col>
        <Col lg="12" className="p-2">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-center"><h2><Cash color="royalblue" size={35} style={{ marginRight: "5px", marginBottom: "5px"}} />Din ekonomi</h2></Card.Title>
                <Card.Text>
                  Använd slider för att sätta värden.
                </Card.Text>
                <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Hushållets lön innan skatt (kr/mån)</Form.Label>
                    <Form.Control ref={salaryBeforeTaxRef}  type="text" placeholder="0" onInput={handleInput} />
                    <Form.Control ref={salarySlideBeforeTaxRef} type="range" min="20000" max="200000" step="1000" onChange={handleSlide} />                
                  </Form.Group>                   
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Egen insats</Form.Label>
                    <Form.Control ref={ownCashRef} type="text" placeholder="0" onInput={handleInput} />
                    <Form.Control ref={ownSlideCashRef} type="range" min={data.minOwnCash} max={data.bid} step="10000" onChange={handleSlide} />                
                  </Form.Group>                                              
                </Form>       
              </Card.Body>
            </Card>
        </Col>           
        <Col lg="12" className="p-2">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title><h2 className="text-center"><Calculator color="royalblue" size={35} style={{ marginRight: "5px", marginBottom: "5px"}} />Simulering</h2></Card.Title>
                <Card.Text>
                  Använd slider för att sätta tänkt bud.
                </Card.Text>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Bud</Form.Label>
                    <Form.Control ref={bidRef} type="text" placeholder="0" onInput={handleInput} />
                    <Form.Control ref={bidSlideRef} type="range" min={data.housePrice} max={data.housePrice*1.7} step="10000" onChange={handleSlide} />                
                  </Form.Group>                             
                </Form>
                <Card.Title style={{marginBottom: "5px"}}><Cash color="royalblue" size={35} style={{ marginRight: "5px"}} />Kostnader</Card.Title>
                <Table striped bordered hover size="sm">
                <tr>
                  <th>Pantbrev</th>
                  <td>{formatter.format(data.pantCost)}</td>
                </tr>
                <tr>
                  <th>Lagfart</th>
                  <td>{formatter.format(data.lagfartCost)}</td>
                </tr>
                <tr>
                  <th>Bolån</th>
                  <td>{formatter.format(data.morgage)}</td>
                </tr>                
                <tr>
                  <th>Total kostnad</th>
                  <td>{formatter.format(data.totalCost)}</td>
                </tr>            
                </Table>            
              </Card.Body>
            </Card>
        </Col>        
      </Row>


      <Modal size="lg" show={saveModal} onHide={handleCloseSave}>
        <Modal.Header closeButton>
          <Modal.Title>Export JSON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>JSON</Form.Label>
        <Form.Control as="textarea" rows={25} value={JSON.stringify(data)}/>
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSave}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={loadModal} onHide={handleCloseLoad}>
        <Modal.Header closeButton>
          <Modal.Title>Export JSON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>JSON</Form.Label>
        <Form.Control as="textarea" rows={25} ref={loadFieldRef}/>
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleImport}>
            Import
          </Button>
        </Modal.Footer>
      </Modal>      

        

      
      </Container>
  );
}

export default App;
