
export class AbortClassRequestor{
    private abortRequest=false;

    requestAbort(){
    	this.abortRequest=true;
    }
    isAborted(){
    	return this.abortRequest;
    }    
}