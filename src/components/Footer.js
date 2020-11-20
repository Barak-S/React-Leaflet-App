import React from 'react'

export default function Footer() {
    return (
        // <div id="footer" style={{ textAlign: "center", fontSize: 17, fontWeight: "600", color: "#ED5145", backgroundColor: "#343A40" }}>
        //     <p style={{margin: 0, padding: 7}}>© 2020, <a alt="Barak Saidoff Developer Potfolio" target="_blank" href="https://baraksaidoff.com/" style={{color: "#ED5145" }}>Barak Web Development</a></p>
        // </div>
        <div className="main-footer" style={{color: "#ED5145", backgroundColor: '#343A40'}}>
        <div className="container" style={{paddingTop: 12}}>
            <div className="row">
                <div className="col">
                    <h4>NYC Skatepark Directory</h4>
                    <h3 className="list-unstyled">
                    <li>New York, NY</li>
                    </h3>
                </div>
                <div className="col">
                    <ui className="list-unstyled">
                    <li>Blog</li>
                    <li>Contact</li>
                    <li>About</li>
                    </ui>
                </div>
                <div className="col">
                    <ui className="list-unstyled">
                    <li>Our Offices</li>
                    <li>Support</li>
                    <li>Advertisers</li>
                    </ui>
                </div>
            </div>
            <hr />
            <div className="row">
                <p className="col-sm">
                    © 2020, <a alt="Barak Saidoff Developer Potfolio" target="_blank" href="https://baraksaidoff.com/" style={{color: "#ED5145" }}>Barak Web Development</a>
                </p>
            </div>
        </div>
    </div>

    )
}
