import React from 'react';
import { Users, Activity, TrendingUp, Award, Calendar, ArrowUp} from 'lucide-react';

const Dashboard = () => {
  // Stats data
  const stats = [
    { title: 'Total Users', value: '12,847', change: '+12.5%', icon: Users, color: '#6366f1' },
    { title: 'Active Sessions', value: '1,284', change: '+8.2%', icon: Activity, color: '#10b981' },
    { title: 'Growth Rate', value: '+23.5%', change: '+5.3%', icon: TrendingUp, color: '#f59e0b' },
    { title: 'Achievements', value: '47', change: '+3', icon: Award, color: '#8b5cf6' }
  ];

  // Activity data
  const activities = [
    { id: 1, user: 'John Doe', action: 'completed profile setup', time: '2 min ago', type: 'success' },
    { id: 2, user: 'Jane Smith', action: 'uploaded new content', time: '15 min ago', type: 'info' },
    { id: 3, user: 'Mike Johnson', action: 'earned achievement badge', time: '1 hour ago', type: 'success' },
    { id: 4, user: 'Sarah Wilson', action: 'reached daily goal', time: '3 hours ago', type: 'warning' }
  ];

  // Chart data
  const chartData = [65, 72, 78, 82, 88, 92];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2 className="welcome-title">Welcome back, Admin! 👋</h2>
          <p className="welcome-subtitle">Here's what's happening with your application today.</p>
        </div>
        <div className="date-badge">
          <Calendar size={16} />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon-wrapper">
              <div className="stat-icon-bg" style={{ backgroundColor: `${stat.color}15` }}>
                <stat.icon size={28} color={stat.color} />
              </div>
            </div>
            <div className="stat-info">
              <p className="stat-title">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
              <span className="stat-change positive">
                <ArrowUp size={12} />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Performance Chart */}
        <div className="chart-card">
          <div className="card-header">
            <h3 className="card-title">Performance Overview</h3>
            <select className="period-select">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="chart-container">
            <div className="chart-bars">
              {chartData.map((value, index) => (
                <div key={index} className="bar-item">
                  <div 
                    className="bar"
                    style={{ height: `${(value / 100) * 150}px` }}
                  >
                    <span className="bar-value">{value}%</span>
                  </div>
                  <span className="bar-label">{months[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <button className="view-all-btn">View All →</button>
          </div>
          <div className="activity-list">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-dot ${activity.type}`}></div>
                <div className="activity-details">
                  <div className="activity-user">{activity.user}</div>
                  <div className="activity-action">{activity.action}</div>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3 className="quick-actions-title">Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">+ Add New User</button>
          <button className="action-btn">📊 Generate Report</button>
          <button className="action-btn">⚙️ System Settings</button>
          <button className="action-btn">📧 Send Notification</button>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          width: 100%;
          min-height: 100vh;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Welcome Section */
        .welcome-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .welcome-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .welcome-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .welcome-subtitle {
          font-size: 15px;
          opacity: 0.95;
        }

        .date-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 12px 24px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 500;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 24px;
          padding: 28px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.15);
        }

        .stat-icon-bg {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .stat-card:hover .stat-icon-bg {
          transform: scale(1.05);
        }

        .stat-info {
          flex: 1;
        }

        .stat-title {
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 8px;
          letter-spacing: -1px;
        }

        .stat-change {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #d1fae5;
          color: #065f46;
        }

        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .chart-card, .activity-card {
          background: white;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
        }

        .chart-card:hover, .activity-card:hover {
          box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
        }

        .period-select {
          padding: 8px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 13px;
          background: white;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .period-select:hover {
          border-color: #6366f1;
        }

        .view-all-btn {
          color: #6366f1;
          font-size: 14px;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-all-btn:hover {
          color: #4f46e5;
          transform: translateX(3px);
        }

        /* Chart Bars */
        .chart-container {
          padding: 20px 0;
        }

        .chart-bars {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          height: 220px;
          gap: 16px;
        }

        .bar-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .bar {
          width: 100%;
          max-width: 70px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 12px;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .bar:hover {
          transform: scaleX(1.05);
          filter: brightness(1.05);
        }

        .bar-value {
          color: #6366f1;
          font-size: 12px;
          font-weight: 700;
          position: absolute;
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
        }

        .bar-label {
          font-size: 13px;
          color: #6b7280;
          font-weight: 600;
        }

        /* Activity List */
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid #f3f4f6;
          transition: all 0.2s;
          cursor: pointer;
        }

        .activity-item:hover {
          transform: translateX(5px);
        }

        .activity-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .activity-dot.success {
          background: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
        }

        .activity-dot.info {
          background: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }

        .activity-dot.warning {
          background: #f59e0b;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);
        }

        .activity-details {
          flex: 1;
        }

        .activity-user {
          font-weight: 700;
          color: #1f2937;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .activity-action {
          font-size: 13px;
          color: #6b7280;
        }

        .activity-time {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
        }

        /* Quick Actions */
        .quick-actions {
          background: white;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .quick-actions-title {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 24px;
        }

        .actions-grid {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 14px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .action-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 20px -8px rgba(102, 126, 234, 0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .welcome-section {
            flex-direction: column;
            text-align: center;
            gap: 20px;
            padding: 30px;
          }
          
          .welcome-title {
            font-size: 26px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .actions-grid {
            flex-direction: column;
          }
          
          .action-btn {
            justify-content: center;
          }
          
          .chart-bars {
            gap: 8px;
          }
          
          .bar-label {
            font-size: 10px;
          }
        }

        @media (max-width: 480px) {
          .stat-value {
            font-size: 28px;
          }
          
          .card-title {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;