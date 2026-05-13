
    module.exports = function (app) {
        const modelName = "due_diligence";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            dealId: { type: Schema.Types.ObjectId, ref: "deals", comment: "Deal Id, dropdown, false, true, true, true, true, true, true, deals, deals, one-to-one, phase," },
reviewedBy: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Reviewed By, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
creditSafeResult: { type:  String , comment: "Credit Safe Result, p, false, true, true, true, true, true, true, , , , ," },
creditSafeDate: { type: Date, comment: "Credit Safe Date, p_date, false, true, true, true, true, true, true, , , , ," },
propertyDeskReviewNotes: { type:  String , comment: "Property Desk Review Notes, p, false, true, true, true, true, true, true, , , , ," },
residentialBtlDesktopVal: { type:  String , comment: "Residential Btl Desktop Val, p, false, true, true, true, true, true, true, , , , ," },
commercialValuationNotes: { type:  String , comment: "Commercial Valuation Notes, p, false, true, true, true, true, true, true, , , , ," },
overallFindings: { type:  String , comment: "Overall Findings, p, false, true, true, true, true, true, true, , , , ," },
recommendation: { type:  String , comment: "Recommendation, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
reviewedAt: { type: Date, comment: "Reviewed At, calendar_24, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };