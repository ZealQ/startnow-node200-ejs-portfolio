const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);
const expect = chai.expect;

describe("server/app.js"),function(){
    this.timeout(5000);
    beforEach((done)=>{
        done();
    });
    afterEach((done)=>{
        done();
    });
    it("responds to /",(done)=>{
        chai.request(server)
        .get("/")
        .end((err,res)=>{
            expect(err).not.exsist;
            epect(res).to.have.status(200);
            done();
        });
    });
}


