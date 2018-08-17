import React, {Component} from 'react'
import {Button, Form, Input} from 'semantic-ui-react'

const Password = ({description, password, submitter, edit, disabled}) =>  {

  return (
      <Form>
        <Form.Field>
          <Form.Field>{description}</Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input id="editPass" defaultValue={password} labelPosition="right" disabled={disabled} />
          </Form.Field>
        </Form.Field>
        <Form.Field extra>
          <div className='ui two buttons'>
            <Button onClick={((event) => submitter(event, 'edit'))} basic color='green'>
              {edit}
            </Button>
            <Button onClick={((event) => submitter(event, 'delete'))} basic color='red'>
              Delete
            </Button>
          </div>
        </Form.Field>
      </Form>
    )
}

export default Password
