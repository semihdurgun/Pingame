import Letter from './Letter';

function Board() {

    return (
        <div className='board'>
            <div className='row'>
                <Letter pos={0}
                    val={0}/>
                <Letter pos={1}
                    val={0}/>
                <Letter pos={2}
                    val={0}/>
                <Letter pos={3}
                    val={0}/>
            </div>
            <div className='row'>
                <Letter pos={0}
                    val={1}/>
                <Letter pos={1}
                    val={1}/>
                <Letter pos={2}
                    val={1}/>
                <Letter pos={3}
                    val={1}/></div>
            <div className='row'>
                <Letter pos={0}
                    val={2}/>
                <Letter pos={1}
                    val={2}/>
                <Letter pos={2}
                    val={2}/>
                <Letter pos={3}
                    val={2}/></div>
            <div className='row'>
                <Letter pos={0}
                    val={3}/>
                <Letter pos={1}
                    val={3}/>
                <Letter pos={2}
                    val={3}/>
                <Letter pos={3}
                    val={3}/></div>
            <div className='row'>
                <Letter pos={0}
                    val={4}/>
                <Letter pos={1}
                    val={4}/>
                <Letter pos={2}
                    val={4}/>
                <Letter pos={3}
                    val={4}/></div>
            <div className='row'>
                <Letter pos={0}
                    val={5}/>
                <Letter pos={1}
                    val={5}/>
                <Letter pos={2}
                    val={5}/>
                <Letter pos={3}
                    val={5}/></div>
            <div className='row'>
                <Letter pos={0}
                    val={6}/>
                <Letter pos={1}
                    val={6}/>
                <Letter pos={2}
                    val={6}/>
                <Letter pos={3}
                    val={6}/></div>
            <div className='row'>
                <Letter pos={0}
                    val={7}/>
                <Letter pos={1}
                    val={7}/>
                <Letter pos={2}
                    val={7}/>
                <Letter pos={3}
                    val={7}/></div>
            <div className='row'>
                <Letter pos={0}
                    val={8}/>
                <Letter pos={1}
                    val={8}/>
                <Letter pos={2}
                    val={8}/>
                <Letter pos={3}
                    val={8}/></div>
            <div className='row'>
                <Letter pos={0}
                    val={9}/>
                <Letter pos={1}
                    val={9}/>
                <Letter pos={2}
                    val={9}/>
                <Letter pos={3}
                    val={9}/></div>
        </div>
    )
}

export default Board
