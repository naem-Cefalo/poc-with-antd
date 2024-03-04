import React, { useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Steps,
  message,
} from 'antd';
import { useCandidateStore } from '@/app/lib/candidateStore';

interface CandidateCreateFormProps {
  open: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}

const CandidateCreateForm: React.FC<CandidateCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const current = useCandidateStore((state) => state.count);
  const next = useCandidateStore((state) => state.next);
  const prev = useCandidateStore((state) => state.pre);
  const [formData, setFormData] = useState({});
  const [value, setValue] = useState<number>(0);

  const steps = [
    {
      title: 'Basic info',
      content: (
        <Form name="basicInfo" layout="vertical" form={form}>
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the name',
                  },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name="email"
                label="Email"
                sfd
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input the email',
                  },
                ]}>
                <Input type="email" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item
                label="Contact Number"
                name="contactNumber"
                rules={[{ required: true, message: 'Please input!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item label="Applied at" name="appliedAt">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="Address" name="address">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: 'Experience',
      content: (
        <Form name="SkillInfo" layout="vertical" form={form}>
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item
                name="skill"
                label="Skill"
                rules={[
                  {
                    required: true,
                    message: 'Please input the skill',
                  },
                ]}>
                <Select
                  mode="multiple"
                  placeholder="Select skill"
                  allowClear
                  options={[
                    { value: 'JavaScript', label: 'JavaScript' },
                    { value: 'Java', label: 'Java' },
                    { value: 'Python', label: 'Python' },
                  ]}></Select>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name="years"
                label="Total professional experience"
                rules={[
                  {
                    required: true,
                    message: 'Please input the number',
                  },
                ]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item
                name="LastEmployer"
                label="Last employer Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the skill',
                  },
                ]}>
                <Input></Input>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name="notice"
                label="Notice period"
                rules={[
                  {
                    required: true,
                    message: 'Please input the number',
                  },
                ]}>
                <Select
                  placeholder="Select notice period"
                  allowClear
                  options={[
                    { value: '0', label: '0 days' },
                    { value: '30', label: '1 month' },
                    { value: '60', label: '2 month' },
                  ]}></Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="salary"
            label="Expected Salary"
            rules={[
              {
                required: true,
                message: 'Please input the skill',
              },
            ]}>
            <InputNumber
              prefix="$"
              style={{
                width: '100%',
              }}></InputNumber>
          </Form.Item>

          <Flex gap={20}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
            <Button onClick={() => prev()}>Previous</Button>
          </Flex>
        </Form>
      ),
    },
    {
      title: 'Education',
      content: (
        <Form name="professionalInfo" layout="vertical" form={form}>
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item
                name="university"
                label="University Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the name',
                  },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name="degree"
                label="Which discipline"
                tooltip="Discipline of your bachelor's degree"
                rules={[
                  {
                    required: true,
                    message: 'Please input the email',
                  },
                ]}>
                <Input type="textarea" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item
                name="honsPassingYear"
                label="Bachelor Passing year"
                rules={[
                  {
                    required: true,
                    message: 'Please input the name',
                  },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name="CGPA"
                label="CGPA"
                rules={[
                  {
                    required: true,
                    message: 'Please give your input',
                  },
                ]}>
                <Input type="textarea" />
              </Form.Item>
            </Col>
          </Row>
          <Flex gap={20}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Done
              </Button>
            </Form.Item>
            <Button onClick={() => prev()}>Previous</Button>
          </Flex>
        </Form>
      ),
    },
    {
      title: 'Confirmation',
      content: (
        <div>
          <h3>A new candidate has created</h3>
          <Button
            onClick={() => {
              onCreate(formData);
              useCandidateStore.setState(() => ({ count: 0 }));
              form.resetFields();
              onCancel();
            }}>
            Close
          </Button>
        </div>
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Modal
      open={open}
      title="Create a new candidate"
      onCancel={onCancel}
      width={600}
      footer={null}>
      <Steps
        size="small"
        current={current}
        items={items}
        style={{
          margin: '20px 0px',
        }}
      />
      <Form.Provider
        onFormFinish={(name, info) => {
          setFormData((pre) => {
            return { ...pre, ...info.values };
          });
          next();
        }}>
        {steps[current].content}
      </Form.Provider>
    </Modal>
  );
};

export default CandidateCreateForm;
