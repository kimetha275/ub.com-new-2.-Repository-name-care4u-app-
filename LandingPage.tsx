import { Heart, Shield, Users, Calendar, TrendingUp, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Heart className="h-12 w-12 text-white" fill="currentColor" />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-hero bg-clip-text text-transparent">
              Care4U
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
              Compassionate care coordination made simple. Connect caregivers and families for better senior care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate("/auth")}
                className="bg-primary text-white text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary-600"
              >
                Get Started
              </button>
              <button 
                onClick={() => navigate("/auth")}
                className="bg-white text-primary text-lg px-8 py-4 rounded-2xl border-2 border-primary hover:bg-blue-50 transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">For Caregivers</h3>
            <p className="text-gray-600">
              Track daily tasks, log medications, and monitor vital signs with ease.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg">
            <Users className="h-12 w-12 text-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">For Families</h3>
            <p className="text-gray-600">
              Stay connected with real-time updates and share precious moments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
            <Calendar className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-2">Daily Tracking</h3>
            <p className="text-gray-600">
              Keep detailed records of meals, medications, and activities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
            <TrendingUp className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Health Trends</h3>
            <p className="text-gray-600">
              Visualize patterns and insights in care data over time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg">
            <Camera className="h-12 w-12 text-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">Photo Sharing</h3>
            <p className="text-gray-600">
              Capture and share special moments with family members.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
            <Heart className="h-12 w-12 text-accent mb-4" fill="currentColor" />
            <h3 className="text-xl font-bold mb-2">Peace of Mind</h3>
            <p className="text-gray-600">
              Know your loved ones are cared for with comprehensive tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
