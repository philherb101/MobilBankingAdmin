<?php

namespace App\Http\Controllers;

use App\Profile;
use Illuminate\Http\Request;
use Validator;
use Auth;
use Image;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validation
        $this->validate($request,[
            'EmploymentStatus'=>'required | boolean',
            'Company'=>'required |string',
            'Occupation'=>'required |string',
            'AnualIncome'=>'required |string',
            'MonthlyIncome'=>'required |string',
            'Bio'=>'required | string | min:100',
            'EducationLevel'=>'required | string',
        ]);
       
        $userId = auth('api')->user()->id;
        $CheckProfile = Profile::where('UserId',$userId)->first();
        if($CheckProfile === null){
            $profile = new Profile;
        }
        else{
            $profile = $CheckProfile;
        }
        if($request->Avatar){
            $fileName = time().'.'.explode('/',explode(':',substr($request->Avatar,0,strpos($request->Avatar,';')))[1])[1];
            if ($profile->Avatar && $profile->Avatar != "default.png"){
                unlink(public_path('/images/avatar/').$profile->Avatar);
            }
            
            $directory = public_path('/images/avatar/');
            $imageUrl = $directory.$fileName;
            Image::make($request->Avatar)->resize(200, 200)->save($imageUrl);
        }
       
        $profile->UserId = $userId;
        $profile->Avatar = $fileName;
        $profile->EmploymentStatus = $request->EmploymentStatus;
        $profile->Company = $request->Company;
        $profile->Occupation = $request->Occupation;
        $profile->AnualIncome = $request->AnualIncome;
        $profile->MonthlyIncome= $request->AnualIncome;
        $profile->Bio = $request->Bio;
        $profile->EducationLevel = $request->EducationLevel;
        if($profile->save()){
            return response()->json([
                "status"=>"true",
                "success"=>"profile added successfully !!"
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $profile = Profile::where('UserId',auth('api')->user()->id)->first();
        return $profile;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Profile $profile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        //
    }
}