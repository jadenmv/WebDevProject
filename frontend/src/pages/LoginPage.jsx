import {useState} from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); //clearing old messages

    const endpoint = isLogin ? `/api/users/login` : `/api/users/register `;
    const payload = isLogin ? {email, password} : {username, email, password};

    try{
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if(response.ok){
        if(isLogin){
          setMessage(`LOGGED IN AS${data.user.username}`);
          console.log("YOUR JWT TOKEN: ", data.token);
        }else{
          setMessage("ACCOUNT CREATED, YOU CAN NOW LOG IN");
          setIsLogin(true); //flip back to login mode
          setPassword(''); //clear password field
        }
      }else{
        setMessage(data.message || "SOMETHING WENT WRONG")
      }
    }catch(err){
      console.error("AUTHENTICATION ERROR:", err);
      setMessage("CANNOT CONNECT TO SERVER");
    }
  };
  return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? 'Welcome Back to Compile' : 'Join the Discussion'}
          </h2>

          {message && (
              <div className={`p-3 mb-4 text-sm rounded ${message.includes('Success') || message.includes('created') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Only show Username input if they are registering */}
            {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required={!isLogin}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="CS_Student_99"
                  />
                </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="student@university.edu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
              />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              {isLogin ? 'Log In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage(''); // Clear errors when toggling
                }}
                className="text-blue-600 font-semibold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
  );

}