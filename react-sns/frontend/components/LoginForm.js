import React, { useCallback } from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { LOG_IN_REQUEST } from '../reducers/user';
import { useInput } from '../pages/signup';


const LoginError = styled.div`
    color: red;
`;

const LoginForm = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();
    const { isLoggingIn, loginErrorReason } = useSelector(state => state.user);
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId: id,
                password,
            }
        });
    }, [id, password]);

    return (
        <Form onSubmit={onSubmit} style={{ padding: '10px' }}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">패스워드</label>
                <br/>
                <Input name="user-password" value={password} onChange={onChangePassword} type="password" required />
            </div>
            <LoginError>{loginErrorReason}</LoginError>
            <div style={{ marginTop: '10px' }}>
                <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    )
};

export default LoginForm;
