import Header from '../components/header';
import SideBar from '../components/sidebar';
import Login from './login';
import { useAuth } from '../contexts/authContext'


const Elibrary = () => {
    const { userLoggedIn } = useAuth(); 

    return (
        <>
        { userLoggedIn ? 
            <>
                <Header />
                <SideBar />
                <>eLibrary</>
            </>
            :
            <Login />
        }
        </>
    );
}

export default Elibrary;
