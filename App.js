import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

export default function SignInScreen() {

  // State lưu số điện thoại
  const [phone, setPhone] = useState("");

  // State lỗi
  const [error, setError] = useState("");



  // Hàm kiểm tra số điện thoại
  const validatePhone = (number) => {
    const regex = /^0\d{9}$/;   // 10 số bắt đầu bằng 0
    return regex.test(number);
  };



  // Format số điện thoại
  const formatPhone = (text) => {

    // chỉ lấy số
    let cleaned = text.replace(/\D/g, "");

    // giới hạn 10 số
    cleaned = cleaned.substring(0,10);

    let formatted = cleaned;

    if(cleaned.length > 3 && cleaned.length <= 6)
    {
      formatted = cleaned.slice(0,3) + " " + cleaned.slice(3);
    }
    else if(cleaned.length > 6)
    {
      formatted =
        cleaned.slice(0,3) + " " +
        cleaned.slice(3,6) + " " +
        cleaned.slice(6);
    }

    setPhone(formatted);

    // kiểm tra khi nhập
    if(cleaned.length >= 1 && !validatePhone(cleaned))
    {
      setError("Số điện thoại không đúng định dạng");
    }
    else
    {
      setError("");
    }
  };



  // Khi click button
  const handleContinue = () => {

    const rawPhone = phone.replace(/\s/g, "");

    if(!validatePhone(rawPhone))
    {
      Alert.alert(
        "Lỗi",
        "Số điện thoại không đúng định dạng. Vui lòng nhập lại"
      );
      return;
    }

    Alert.alert("Thành công", "Số điện thoại hợp lệ");
  };



  return (
    <View style={styles.container}>

      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Nhập số điện thoại</Text>

      <Text style={styles.desc}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản OneHousing Pro
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="numeric"
        value={phone}
        onChangeText={formatPhone}
      />

      {
        error !== "" &&
        <Text style={styles.error}>{error}</Text>
      }

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    marginTop:60
  },

  title:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:20
  },

  label:{
    fontSize:18,
    marginBottom:5
  },

  desc:{
    color:"gray",
    marginBottom:10
  },

  input:{
    borderBottomWidth:1,
    borderColor:"#ccc",
    paddingVertical:10,
    fontSize:16
  },

  error:{
    color:"red",
    marginTop:5
  },

  button:{
    marginTop:30,
    backgroundColor:"blue",
    padding:15,
    borderRadius:5,
    alignItems:"center"
  },

  buttonText:{
    color:"white",
    fontSize:16,
    fontWeight:"bold"
  }

});