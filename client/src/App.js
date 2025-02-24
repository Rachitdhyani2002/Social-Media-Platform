import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import LogInForm from './pages/auth/LogInForm';
import RegisterForm from './pages/auth/RegisterForm';
import ForgetPasswordForm from './pages/auth/ForgetPasswordForm';
import VerifyOtp from './pages/auth/VerifyOtp';
import LogoSearch from './components/profileComponents/LogoSearch';
import ProfileCard from './components/profileComponents/ProfileCard';
import EditProfileForm from './pages/auth/EditProfileForm';
import FullPostPage from './pages/homepage/FullPostPage';
import FollowersCard from './components/profileComponents/FollowersCard';
import UserChat from './pages/homepage/UserChat';
import Settings from './pages/homepage/Settings';
import AboutUs from './pages/extras/About';
import PrivacyPolicy from './pages/extras/PrivacyPolicy';
import PrivateComponent from './components/privateComponent/PrivateComponent';
function App() {
  return (
    <div className="App">
      <Routes>
        {/*Private Routes */}
        <Route element={<PrivateComponent />}>
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/search' element={<LogoSearch />} />
          <Route path='/profile' element={<ProfileCard />} />
          <Route path='/edit-profile' element={<EditProfileForm />} />
          <Route path='/full-post/:postId' element={<FullPostPage />} />
          <Route path='/followers-card' element={<FollowersCard />} />
          <Route path='/chat/:userId' element={<UserChat />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        </Route>

        {/*Public Routes */}
        <Route path='/' element={<LogInForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/forget-password' element={<ForgetPasswordForm />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<LogInForm/>} />

      </Routes>

    </div>
  );
}

export default App;
