import Header from '../components/header';
import SideBar from '../components/sidebar';
import Login from './login';
import { useAuth } from '../contexts/authContext'


const MyCatalog = () => {
    const { userLoggedIn } = useAuth(); 

    return (
        <>
        { userLoggedIn ? 
            <>
                <Header />
                <SideBar />
                <>My Catalog</>
            </>
            :
            <Login />
        }
        </>
    );
}

export default MyCatalog;
