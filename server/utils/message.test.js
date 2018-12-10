var expect = require("expect")

var {generateMessage} = require("./messages.js")


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
