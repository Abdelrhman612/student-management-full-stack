import React, { useState } from 'react'
import { Card, Form, Button, Alert, Spinner, Container, Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { PersonPlus, Eye, EyeSlash, Person } from 'react-bootstrap-icons'

const SignUp: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState('')
  
  const navigate = useNavigate()

  const checkPasswordStrength = (password: string) => {
    if (password.length === 0) return ''
    if (password.length < 6) return 'ضعيفة'
    if (password.length < 8) return 'متوسطة'
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)) {
      return 'قوية'
    }
    return 'جيدة'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة')
      return
    }
    
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }
    
    setIsLoading(true)
    
    try {
      SignUp({name, email, password});
     alert("✅ تم إنشاء الحساب بنجاح");
      navigate('/signin')
    } catch (err: any) {
      setError(err.response?.data?.message || 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'ضعيفة': return 'danger'
      case 'متوسطة': return 'warning'
      case 'جيدة': return 'info'
      case 'قوية': return 'success'
      default: return 'secondary'
    }
  }

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card className="shadow-lg border-0 rounded-3">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <PersonPlus size={50} className="text-primary mb-3" />
                <Card.Title className="h3 fw-bold text-dark">إنشاء حساب جديد</Card.Title>
                <p className="text-muted">املأ البيانات التالية لإنشاء حسابك</p>
              </div>
              
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">الاسم الكامل</Form.Label>
                  <div className="position-relative">
                    <Form.Control 
                      type="text" 
                      name="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                      placeholder="أدخل اسمك الكامل"
                      className="py-2 ps-5"
                    />
                    <Person className="position-absolute top-50 start-0 translate-middle-y text-muted ms-3" size={18} />
                  </div>
                </Form.Group>
                
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
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setPasswordStrength(checkPasswordStrength(e.target.value))
                      }} 
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
                  {password && (
                    <div className="mt-2">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <div className="progress" style={{ height: '4px' }}>
                            <div 
                              className={`progress-bar bg-${getPasswordStrengthColor()}`}
                              style={{ 
                                width: passwordStrength === 'ضعيفة' ? '33%' : 
                                       passwordStrength === 'متوسطة' ? '66%' : 
                                       passwordStrength === 'جيدة' ? '85%' : '100%' 
                              }}
                            ></div>
                          </div>
                        </div>
                        <small className={`text-${getPasswordStrengthColor()} ms-2 fw-medium`}>
                          {passwordStrength}
                        </small>
                      </div>
                    </div>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">تأكيد كلمة المرور</Form.Label>
                  <div className="position-relative">
                    <Form.Control 
                      type={showConfirmPassword ? "text" : "password"} 
                      name="confirmPassword" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      required 
                      placeholder="أعد إدخال كلمة المرور"
                      className="py-2 pe-5"
                    />
                    <Button
                      variant="link"
                      className="position-absolute top-50 end-0 translate-middle-y text-muted p-0 me-2"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <Form.Text className="text-danger">
                      كلمات المرور غير متطابقة
                    </Form.Text>
                  )}
                  {confirmPassword && password === confirmPassword && (
                    <Form.Text className="text-success">
                      كلمات المرور متطابقة
                    </Form.Text>
                  )}
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
                      جاري إنشاء الحساب...
                    </>
                  ) : (
                    'إنشاء الحساب'
                  )}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-muted">
                    لديك حساب بالفعل؟ <Link to="/signin" className="text-decoration-none">تسجيل الدخول</Link>
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

export default SignUp