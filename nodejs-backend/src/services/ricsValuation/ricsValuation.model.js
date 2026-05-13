
    module.exports = function (app) {
        const modelName = "rics_valuation";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dealId: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal Id, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, status," },
instructionDate: { type: Date, comment: "Instruction Date, p_date, false, true, true, true, true, true, true, , , , ," },
surveyorName: { type:  String , comment: "Surveyor Name, p, false, true, true, true, true, true, true, , , , ," },
surveyorCompany: { type:  String , comment: "Surveyor Company, p, false, true, true, true, true, true, true, , , , ," },
surveyorEmail: { type:  String , comment: "Surveyor Email, p, false, true, true, true, true, true, true, , , , ," },
surveyorPhone: { type: Number, comment: "Surveyor Phone, p_number, false, true, true, true, true, true, true, , , , ," },
inspectionDate: { type: Date, comment: "Inspection Date, p_date, false, true, true, true, true, true, true, , , , ," },
valuationCost: { type: Number, comment: "Valuation Cost, p_number, false, true, true, true, true, true, true, , , , ," },
vatAmount: { type: Number, comment: "Vat Amount, p_number, false, true, true, true, true, true, true, , , , ," },
propertyAddress: { type:  String , comment: "Property Address, p, false, true, true, true, true, true, true, , , , ," },
estimatedValue: { type: Number, comment: "Estimated Value, p_number, false, true, true, true, true, true, true, , , , ," },
propertyDescription: { type:  String , comment: "Property Description, p, false, true, true, true, true, true, true, , , , ," },
propertyType: { type:  String , comment: "Property Type, p, false, true, true, true, true, true, true, , , , ," },
applicantName: { type:  String , comment: "Applicant Name, p, false, true, true, true, true, true, true, , , , ," },
accessArrangedThrough: { type:  String , comment: "Access Arranged Through, p, false, true, true, true, true, true, true, , , , ," },
invoiceEmail: { type:  String , comment: "Invoice Email, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };