import React, { useEffect } from 'react'

function Pyramid({val}) {


  const paint_circle = async (val)=>{
    const content = document.querySelectorAll('.circle')
    var paint = (21 - 20*val/100)

    for (let i = content.length-1; i >= paint ; i--) {
      content[i].style.backgroundColor = '#63a75c'
    }
    content[Math.floor(paint)].style.background = "linear-gradient(to top, #63a75c "+(paint - Math.floor(paint))*100 + "%, transparent 0%)"; 
  }

  useEffect(() => {
    paint_circle(val)
  }, [document.querySelectorAll('.circle')]);

  return (
  <div>
    <div>
      <span className="circle"></span>
    </div>
    <div>
      <span className="circle"></span>
      <span className="circle "></span>
    </div>
    <div>
      <span className="circle"></span>
      <span className="circle"></span>
      <span className="circle"></span>
    </div>
    <div>
      <span className="circle"></span>
      <span className="circle"></span>
      <span className="circle"></span>
      <span className="circle"></span>
    </div>
    <div>
      <span className="circle"></span>
      <span className="circle"></span> 
      <span className="circle"></span>
      <span className="circle"></span>
      <span className="circle"></span>
    </div>
    <div>
      <span className="circle"></span>
      <span className="circle"></span>
      <span className="circle"></span> 
      <span className="circle"></span>
      <span className="circle"></span>
      <span className="circle"></span>
    </div>
  </div>

  )
}

export default Pyramid