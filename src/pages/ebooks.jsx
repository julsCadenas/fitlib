import Header from '../components/header';
import SideBar from '../components/sidebar';
import Login from './login';
import { useAuth } from '../contexts/authContext'


const Ebooks = () => {
    const { userLoggedIn } = useAuth(); 

    return (
        <>
        { userLoggedIn ? 
            <>
                <Header />
                <SideBar />
                <>eBooks</>
            </>
            :
            <Login />
        }
        </>
    );
}

export default Ebooks;
