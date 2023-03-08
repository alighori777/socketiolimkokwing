import React from 'react';
import { Card, Row, Col, Form, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { PlusIcon, ChatInputIcon } from 'Atoms/CustomIcons';
import { InputField } from 'Atoms/FormElement';

export default (props) => {
  const { sendMessage } = props;
  const { handleSubmit, control, reset } = useForm({ defaultValues: { inputmessage: '' } });

  const onSend = (val) => {
    sendMessage(val.inputmessage);
    reset();
  };

  return (
    <Card bordered={false} className="uni-card input-card">
      <Form onFinish={handleSubmit(onSend)}>
        <Row gutter={[20, 10]} wrap={false} align="middle">
          <Col flex="0 1 40px">
            <Button
              className="linkbtn"
              htmlType="button"
              type="link"
              icon={<PlusIcon className="fontSize20 c-white" />}
            />
          </Col>
          <Col flex="auto">
            <InputField
              fieldname="inputmessage"
              label=""
              control={control}
              class="transparentField mb-0"
              iProps={{ placeholder: 'Write your message..', size: 'large' }}
              initValue=""
            />
          </Col>
          <Col flex="0 1 40px">
            <Button
              className="linkbtn"
              htmlType="submit"
              type="link"
              icon={<ChatInputIcon className="ag-fontSize30 c-white" />}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
