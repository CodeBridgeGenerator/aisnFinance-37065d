
    module.exports = function (app) {
        const modelName = "director_decision";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            creditpaperId: { type: Schema.Types.ObjectId, ref: "credit_paper", comment: "Creditpaper Id, dropdown, false, true, true, true, true, true, true, creditPaper, credit_paper, one-to-one, borrowerName," },
directorProfileId: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Director Profile Id, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
recommendationText: { type:  String , comment: "Recommendation Text, p, false, true, true, true, true, true, true, , , , ," },
decision: { type:  String , comment: "Decision, p, false, true, true, true, true, true, true, , , , ," },
comments: { type:  String , comment: "Comments, p, false, true, true, true, true, true, true, , , , ," },
signedAt: { type: Date, comment: "Signed At, p_date, false, true, true, true, true, true, true, , , , ," },
decidedAt: { type: Date, comment: "Decided At, p_date, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };