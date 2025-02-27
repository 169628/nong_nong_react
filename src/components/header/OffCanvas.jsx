import { useState } from 'react';
import { Button, Form, Offcanvas, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ setIsAuth }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    // 註冊表單狀態
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
        trigger // Added to manually trigger validation
    } = useForm();

    // 登入表單狀態
    const { register: loginRegister, handleSubmit: loginSubmit, formState: { errors: loginErrors }, reset: resetLoginForm } = useForm();

    const [account, setAccount] = useState({
        email: "email@abc.com",
        password: "******"
    });

    // 登入表單提交處理
    const handleLoginSubmit = async (data) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_URL}/users/login`, account);
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;

            axios.defaults.headers.common['Authorization'] = token;
            setIsAuth(true);
            toast.success(`登入成功！用戶：${account.email}`);
            setShowLogin(false);  // 關閉登入頁
        } catch (error) {
            console.log(error.response.data);
            toast.error('登入失敗，請再試一次！');
        }
    };

    // 註冊表單提交處理
    const handleRegisterSubmit = async (data) => {
        // Trigger field validation manually
        const isValid = await trigger(); // Trigger validation for all fields
        if (!isValid) {
            return; // If validation fails, prevent API call
        }

        // 密碼和確認密碼檢查
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: '密碼不一致',
            });
            toast.error('密碼不一致');
            return;
        }

        try {
            console.log('register before axios');
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/users/register`, data);
            console.log('register after axios success', response.data.success);
            if (response.data.success) {
                toast.success('註冊成功!');
                setShowRegister(false);  // 關閉註冊頁
                setShowLogin(true);  // 打開登入頁
                reset();  // 使用 reset 清除欄位資料和錯誤訊息
            } else {
                throw new Error(response.data.message || '註冊失敗');
            }

        } catch (error) {
            toast.error(`註冊失敗：${error.message}`);
        }
    };

    return (
        <Container className="mt-5">
            <Button variant="primary" onClick={() => { resetLoginForm(); setShowLogin(true); }}>
                登入 / 註冊
            </Button>

            {/* 登入頁 Offcanvas */}
            <Offcanvas show={showLogin} onHide={() => setShowLogin(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title >
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="text-center fs-3 fw-bold">登入</div>
                    <Form onSubmit={loginSubmit(handleLoginSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>帳號</Form.Label>
                            <Form.Control
                                type="email"
                                value={account.email}
                                placeholder="email@example.com"
                                {...loginRegister('loginEmail', {
                                    required: 'Email 欄位必填',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Email 格式錯誤',
                                    }
                                })}
                            />
                            {loginErrors.loginEmail && <span className="text-danger">{loginErrors.loginEmail.message}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>密碼</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                value={account.password}
                                {...loginRegister('loginPassword', { required: '密碼必填' })}
                            />
                            {loginErrors.loginPassword && <span className="text-danger">{loginErrors.loginPassword.message}</span>}
                        </Form.Group>

                        <Button variant="secondary" onClick={() => {
                            setShowLogin(false);
                            setShowRegister(true);
                        }} className="w-50 ">
                            註冊
                        </Button>
                        <Button variant="primary" type="submit" className="w-50 ">
                            登入
                        </Button>

                    </Form>
                </Offcanvas.Body>
            </Offcanvas>

            {/* 註冊頁 Offcanvas */}
            <Offcanvas show={showRegister} onHide={() => setShowRegister(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="text-center fs-3 fw-bold">註冊</div>
                    <Form onSubmit={handleSubmit(handleRegisterSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email@example.com"
                                {...register('email', {
                                    required: 'Email 欄位必填',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Email 格式錯誤',
                                    }
                                })}
                                className={`form-control ${errors.email && 'is-invalid'}`}
                            />
                            {errors.email && (<div className="text-danger">{errors.email?.message}</div>)}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>姓名</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="請使用本名"
                                {...register('name', {
                                    required: '姓名必填',
                                    minLength: { value: 2, message: '姓名至少2個字符' }
                                })}
                            />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>密碼</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                {...register('password', {
                                    required: '密碼必填',
                                    minLength: { value: 6, message: '密碼至少6個字符' }
                                })}
                            />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>確認密碼</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                {...register('confirmPassword', {
                                    required: '確認密碼必填',
                                })}
                            />
                            {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            註冊
                        </Button>
                        <div className="text-center mt-3">
                            <Button
                                variant="link"
                                onClick={() => {
                                    setShowRegister(false);
                                    setShowLogin(true);
                                }}
                            >
                                登入
                            </Button>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>

            <ToastContainer />
        </Container>
    );
}

export default App;
