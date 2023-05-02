import MainPagesController from '../controllers/pages/main.controller';

function Main(props: {}) {

    return (
        <div className="flex justify-center bg-slate-400 min-h-screen">

            <div className="flex flex-col justify-center">

                <MainPagesController/>
                
            </div>
        </div>
    );
}

export default Main;