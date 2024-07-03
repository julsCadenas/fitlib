import Header from '../components/header';
import SideBar from '../components/sidebar';
import Login from './login';
import { useAuth } from '../contexts/authContext'


const Admin = () => {
    const { userLoggedIn } = useAuth(); 

    return (
        <>
        { userLoggedIn ? 
            <>
                <Header />
                <SideBar />
                <>Admin Page</>
            </>
            :
            <Login />
        }
        </>
    );
}

export default Admin;
