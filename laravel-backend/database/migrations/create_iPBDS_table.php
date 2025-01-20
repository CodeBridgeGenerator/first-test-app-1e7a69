<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('i_p_b_d')) {
            dd("table i_p_b_d already exists");
        }
        else {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            Schema::create('i_p_b_d', function (Blueprint $table) {
                $table->id();
                $table->string('SN');
$table->unsignedBigInteger('No');
$table->string('PktMgktFED');
$table->string('Pkt');
$table->string('Nama');
$table->string('Jawatan');
$table->timestamp('TarikhMasukTentera')->nullable();
$table->string('KursusKerjaya');
$table->string('KursusKepakaran');
$table->string('KelayakanAkademik');
$table->string('DKT');
$table->string('SKT');
$table->timestamp('TarikhTamatPerkhidmatan')->nullable();
$table->string('KursusTerkiniDalamNegara');
$table->timestamp('TarikhKursusTerkini')->nullable();
$table->string('KursusLuarNegara');
$table->timestamp('TarikhKursusLuarNegara')->nullable();
$table->string('Catatan');
                $table->unsignedBigInteger('created_by');
                $table->foreign('created_by')->references('id')->on('users');
                $table->unsignedBigInteger('updated_by');
                $table->foreign('updated_by')->references('id')->on('users');
                $table->timestamps();
            });
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('iPBD');
    }
};
