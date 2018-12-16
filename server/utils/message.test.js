var expect = require("expect")

var {generateMessage, generateLocationMessage} = require("./messages.js")


describe("generateMessage", ()=>{
  it("should generate the correct message object", ()=>{
    var from = "mand"
    var text = "hi what's up"
    var m = generateMessage(from, text)

    expect(m.from).toBe(from)
    expect(m.text).toBe(text)
    expect(typeof m.createdAt).toBe("number")
  });
})

describe("generateLocationMessage", ()=>{
  it("should give currect latitude and longitude", ()=>{
    var from = "Mand";
    var latitude = 2;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=2,1';
    var message = generateLocationMessage(from, latitude, longitude);
    console.log(message)
        expect(message.from).toBe(from)
        expect(message).toMatchObject({from, url})
        expect(typeof message.createdAt).toBe("number")
  })
})
