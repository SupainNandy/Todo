import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [task, setTask] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  const [taskData, setTaskData] = useState({
    title: '',
    description: ''
  })

  const [editTask, setEditTask] = useState(null)

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  // 📥 Fetch Tasks
  const fetchTask = async () => {
    try {
      const res = await axios.get('https://todo-backend-6dp9.onrender.com/api/task/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTask(res.data.user)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return navigate('/')
    fetchTask()
  }, [navigate, token])

  // ➕ Add Task
  const handleAddTask = async (e) => {
    e.preventDefault()

    try {
      setActionLoading(true)

      await axios.post(
        "https://todo-backend-6dp9.onrender.com/api/task/addtask",
        taskData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setTaskData({ title: '', description: '' })
      fetchTask()
    } catch (err) {
      alert("Failed to add task")
    } finally {
      setActionLoading(false)
    }
  }

  // ❌ Delete
  const handleDelete = async (id) => {
    try {
      setActionLoading(true)

      await axios.delete(
        `https://todo-backend-6dp9.onrender.com/api/task/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      fetchTask()
    } catch (err) {
      console.log(err)
    } finally {
      setActionLoading(false)
    }
  }

  // ✏️ Start Edit
  const startEdit = (t) => {
    setEditTask(t)
  }

  // ✏️ Update Task
  const handleUpdate = async () => {
    try {
      setActionLoading(true)

      await axios.put(
        `https://todo-backend-6dp9.onrender.com/api/task/update/${editTask._id}`,
        {
          title: editTask.title,
          description: editTask.description
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setEditTask(null)
      fetchTask()
    } catch (err) {
      console.log(err)
    } finally {
      setActionLoading(false)
    }
  }

  // 🎨 Reusable Premium Styles
  const premiumCardStyle = {
    background: 'rgba(25, 25, 25, 0.65)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
  }

  const premiumInputStyle = {
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
  }

  const goldGradient = 'linear-gradient(135deg, #D4AF37 0%, #AA771C 100%)'

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'radial-gradient(circle at top left, #1a1a24 0%, #000000 100%)', 
      color: '#ffffff',
      padding: '3rem 0',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>
      <div className="container">

        {/* 🌟 Premium Header */}
        <div 
          className="d-flex justify-content-between align-items-center mb-5 p-4 rounded-4" 
          style={premiumCardStyle}
        >
          <h2 className="mb-0 fw-bold" style={{ background: goldGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Workspace
          </h2>
          <button 
            className="btn rounded-pill px-4 fw-bold shadow-sm transition" 
            onClick={handleLogout} 
            style={{ 
              background: 'transparent', 
              color: '#ff4d4d', 
              border: '1px solid #ff4d4d' 
            }}
            onMouseOver={(e) => { e.target.style.background = '#ff4d4d'; e.target.style.color = '#fff' }}
            onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ff4d4d' }}
          >
            Sign Out
          </button>
        </div>

        {/* ➕ Add Task Form */}
        <div className="card mb-5 rounded-4" style={premiumCardStyle}>
          <div className="card-body p-4 p-md-5">
            <h5 className="fw-bold mb-4" style={{ color: '#D4AF37', letterSpacing: '1px' }}>NEW ENTRY</h5>
            <form onSubmit={handleAddTask}>
              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg shadow-none"
                    placeholder="Title"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    style={premiumInputStyle}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="description"
                    className="form-control form-control-lg shadow-none"
                    placeholder="Description"
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    style={premiumInputStyle}
                    required
                  />
                </div>
                <div className="col-md-2 d-grid">
                  <button 
                    className="btn btn-lg rounded-3 text-dark fw-bold" 
                    disabled={actionLoading}
                    style={{ background: goldGradient, border: 'none', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)' }}
                  >
                    {actionLoading ? "Adding..." : "Add"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* 📋 Task List Grid */}
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border" style={{ color: '#D4AF37' }} role="status"></div>
              <p className="mt-3 fw-bold" style={{ color: '#a0a0a0', letterSpacing: '2px' }}>LOADING RECORDS...</p>
            </div>
          ) : task.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h4 style={{ color: '#555', fontWeight: '300' }}>Your workspace is currently empty.</h4>
            </div>
          ) : (
            task.map((t) => (
              <div key={t._id} className="col-12 col-md-6 col-lg-4">
                <div 
                  className="card h-100 rounded-4" 
                  style={{...premiumCardStyle, transition: 'transform 0.3s ease, boxShadow 0.3s ease'}}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div className="card-body p-4 d-flex flex-column">

                    {editTask && editTask._id === t._id ? (
                      // Edit Mode
                      <>
                        <input
                          className="form-control mb-3 shadow-none"
                          value={editTask.title}
                          onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                          style={premiumInputStyle}
                        />
                        <textarea
                          className="form-control mb-3 shadow-none flex-grow-1"
                          rows="3"
                          value={editTask.description}
                          onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                          style={premiumInputStyle}
                        />

                        <div className="d-flex gap-2 mt-auto">
                          <button
                            className="btn flex-grow-1 text-dark fw-bold rounded-pill"
                            onClick={handleUpdate}
                            style={{ background: goldGradient, border: 'none' }}
                          >
                            Save
                          </button>
                          <button
                            className="btn flex-grow-1 fw-bold rounded-pill"
                            onClick={() => setEditTask(null)}
                            style={{ background: 'transparent', color: '#a0a0a0', border: '1px solid #a0a0a0' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      // View Mode
                      <>
                        <h5 className="fw-bold mb-3" style={{ color: '#ffffff' }}>{t.title}</h5>
                        <p className="flex-grow-1" style={{ color: '#a0a0a0', lineHeight: '1.6' }}>{t.description}</p>

                        <div className="d-flex gap-2 mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          <button
                            className="btn flex-grow-1 fw-bold rounded-pill"
                            onClick={() => startEdit(t)}
                            style={{ background: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37' }}
                            onMouseOver={(e) => { e.target.style.background = 'rgba(212, 175, 55, 0.1)' }}
                            onMouseOut={(e) => { e.target.style.background = 'transparent' }}
                          >
                            Edit
                          </button>

                          <button
                            className="btn flex-grow-1 fw-bold rounded-pill"
                            onClick={() => handleDelete(t._id)}
                            style={{ background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d' }}
                            onMouseOver={(e) => { e.target.style.background = 'rgba(255, 77, 77, 0.1)' }}
                            onMouseOut={(e) => { e.target.style.background = 'transparent' }}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard