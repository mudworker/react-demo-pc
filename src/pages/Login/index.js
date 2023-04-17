import {Card, Form, Input, Checkbox, Button, message} from "antd";
import logo from '@/assets/logo.png'
import './index.scss'
import useStore from "@/store";
import {useNavigate} from "react-router-dom";

function Login() {
    const {loginStore} = useStore()
    const navigate = useNavigate()

    async function onFinish(values) {
        // 参数values即是表单输入数据
        // console.log(values)
        // 登陆
        const {mobile, code} = values
        try {
            await loginStore.getToken({mobile, code})
            // 跳转首页
            navigate('/', {replace: true})
            // 提示成功
            message.success('登陆成功')
        } catch (e) {
            message.error(e.response?.data?.message || '登陆失败')
        }
    }

    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt=''/>
                {/*登陆表单*/}
                <Form
                    initialValues={{remember: true, mobile:'13811111111',code: '246810'}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='mobile'
                        rules={[
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号码格式不对',
                                validateTrigger: 'onBlur'
                            },
                            {required: true, message: '请输入手机号'}
                        ]}>
                        <Input size="large" placeholder="请输入手机号"/>
                    </Form.Item>
                    <Form.Item
                        name='code'
                        rules={[
                            {len: 6, message: '请输入6位验证码', validateTrigger: 'onBlur'},
                            {required: true, message: '请输入验证码'}
                        ]}>
                        <Input size="large" placeholder="请输入验证码"/>
                    </Form.Item>
                    <Form.Item
                        name='remember'
                        valuePropName="checked">
                        <Checkbox className="login-checkbox-label">
                            我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login