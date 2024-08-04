import React, { useState } from 'react';
import axios from 'axios';
import "../.././../src/App.css";
import { Button, Col, Drawer, Input, Row,Space,Form} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const initialOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
  { label: 'Education', value: 'education' }
];

const SegmentDialog = () => {
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemaOptions, setSchemaOptions] = useState(initialOptions);
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(initialOptions);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSaveSegment = () => {
    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map(option => ({ [option.value]: option.label }))
    };

    axios.post('https://webhook.site/8c3708b3-89b8-4a57-b1be-c939f163e734', payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleAddNewSchema = () => {
    const selectedValue = document.getElementById('schema-select').value;
    const selectedOption = initialOptions.find(opt => opt.value === selectedValue);

    if (selectedOption) {
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setSchemaOptions(schemaOptions.filter(opt => opt.value !== selectedValue));
      setAvailableOptions(availableOptions.filter(opt => opt.value !== selectedValue));
    }
  };

  const handlePopupClose = () => {
    setSegmentName('');
    setSelectedSchemas([]);
    setSchemaOptions(initialOptions);
    setAvailableOptions(initialOptions);
    setOpen(false);
  };

  return (
    <>
      <Button className='segment-button' onClick={showDrawer}>Save Segment</Button>
      <Drawer
        title="Saving Segment"
        className="custom-drawer"
        width={480}
        onClose={onClose}
        open={open}
        footer={
          <Space>
            <Button style={{ backgroundColor: 'darkcyan', color: "white" }} onClick={handleSaveSegment}>
              Submit
            </Button>
            <Button style={{ color: "red" }} onClick={handlePopupClose}>Cancel</Button>
          </Space>
        }
      >
        <Row className='container-row'>
          <Col span={24}>
          <Form.Item label="Name" style={{ width: '100%' }}>
              <Input
                placeholder="Enter segment name"
                value={segmentName}
                style={{ width: "100%" }}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <p className='content-text'>To save your segment you need to add the schema to bild the query</p>
          </Col>
          <Col span={6} style={{marginLeft: "160px"}}>
          <div className='round-but-content'>
               <span className='round-button-green'></span>
               <span>User Tracks</span>
               </div>
        </Col>
        <Col span={8}>
        <div className='round-but-content'>
               <span className='round-button-red'></span>
               <span>Group Tracks</span>
               </div>
        </Col>

          <Col span={24}>
             <select id="schema-select" className='sel-item'>
            {availableOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          </Col>
          <Col span={24}>

          <Button type="link" onClick={handleAddNewSchema} className='add-but'>
              + Add new schema
            </Button>
            </Col>
            <Col span={24}>

            <div className="schema-list">
            {selectedSchemas.map((schema, index) => (
              <div key={index}>
                <select className='sel-item'>
                  {initialOptions.map(opt => (
                    <option key={opt.value} value={opt.value} disabled={selectedSchemas.some(sel => sel.value === opt.value)}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default SegmentDialog;
