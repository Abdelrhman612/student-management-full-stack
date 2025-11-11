import React, { useState } from 'react'
import { Card, Form, Button, Alert, Spinner, Container, Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeSlash, PersonCircle } from 'react-bootstrap-icons'

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')
  const [role, setRole] = useState('Student')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      SignIn({email, password, role});
      alert("✅ تم تسجيل الدخول بنجاح");
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'فشل تسجيل الدخول. يرجى التحقق من بياناتك والمحاولة مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card className="shadow-lg border-0 rounded-3">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <PersonCircle size={50} className="text-primary mb-3" />
                <Card.Title className="h3 fw-bold text-dark">تسجيل الدخول</Card.Title>
                <p className="text-muted">أدخل بياناتك للوصول إلى حسابك</p>
              </div>
              
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">البريد الإلكتروني</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="example@domain.com"
                    className="py-2"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">كلمة المرور</Form.Label>
                  <div className="position-relative">
                    <Form.Control 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                      placeholder="أدخل كلمة المرور"
                      className="py-2 pe-5"
                    />
                    <Button
                      variant="link"
                      className="position-absolute top-50 end-0 translate-middle-y text-muted p-0 me-2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">الدور</Form.Label>
                  <Form.Select 
                    name="role" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="py-2"
                  >
                    <option value="Student">طالب</option>
                    <option value="Staff">موظف</option>
                    <option value="SystemUser">مستخدم نظام</option>
                  </Form.Select>
                </Form.Group>
                
                <Button 
                  type="submit" 
                  className="w-100 py-2 fw-medium" 
                  disabled={isLoading}
                  variant="primary"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      جاري تسجيل الدخول...
                    </>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-muted">
                    ليس لديك حساب؟ <Link to="/SignUp" className="text-decoration-none">إنشاء حساب جديد</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignIn