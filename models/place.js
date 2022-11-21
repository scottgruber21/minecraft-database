export class Place{
    constructor(title, x, y, z, type, description, id=null, dateModified = new Date().toString(), dateCreated = new Date().toString()){
        this.title = title
        this.x = x
        this.y = y
        this.z = z
        this.combined = x + y
        this.type = type
        this.description = description
        this.id = id
        this.dateModified = dateModified
        this.dateCreated = dateCreated
    }
}